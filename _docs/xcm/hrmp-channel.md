---
title: Establish HRMP channel with Turing
subtitle: Walk through the process of establishing HRMP channel via XCM and Governance
author: chris
tags: [xcm]
---

# About HRMP Channel
An HRMP channel enables a one-way communication between two parachains. There are a few pre-requisites for a chain A to open a channel to chain B.

First, both chains are already connected with the same relay chain such as Kusama.

Second, once connected with the relay chain, a parachain can send XCM message to it, but not its other parachains. That’s why chain A needs to send requests to the relay chain, indicating that it wants to build a trusted channel with chain B.

Lastly, it takes two requests for a channel to establish. Taking A -> B channel as an example, A needs to call `hrmp.hrmpInitOpenChannel()` for the request, and then B needs to call `hrmp.hrmpAcceptOpenChannel()` to accept it. 

Note that depending on product usage, sometimes a one-way channel is sufficient between two parachains, but in order to build a two-way channel, another pair of init and accept calls in the opposite direction are required.

To checkout what channels have been established on Polkadot and Kusama, check out https://dotsama-channels.vercel.app/#/. A request channel is shown by a dashed red line while and accept request is a solid teal line.

## A close look
We mentioned that two calls are needed for a channel, so now let’s go into details of them. For clarity, we are using the below parameters for the entire document.
- Relay chain: Rococo
- Chain A: paraId 2114 (Turing Staging, testnet of Turing)
- Chain B: paraId 2006 (Rocstar, testnet of Shiden)
  
> Where to find the above paraIds? [Rococo’s Network -> Parachains tab](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains)

Now let’s check out the details of the two requests, with the example of channel 2114 -> 2006.
```
# Chain A: request a channel to open
hrmp.hrmpInitOpenChannel(recipient: 2006, proposedMaxCapacity: 1,000, proposedMaxMessageSize: 102,400)

# Chain B: accept the above request
hrmp.hrmpAcceptOpenChannel(sender: 2114)
```
> Where to find values of the above parameters, proposedMaxCapacity and proposedMaxMessageSize? Best way to check is to go to [Polkadot.js.org/apps, Developer -> Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/chainstate), and call configuration.activeConfig() to retrieve the relay chain config.
```
  hrmpMaxParachainOutboundChannels: 30
  hrmpMaxParathreadOutboundChannels: 0
  hrmpSenderDeposit: 0
  hrmpRecipientDeposit: 0
  hrmpChannelMaxCapacity: 1,000 <===
  hrmpChannelMaxTotalSize: 102,400
  hrmpMaxParachainInboundChannels: 30
  hrmpMaxParathreadInboundChannels: 0
  hrmpChannelMaxMessageSize: 102,400 <===
```
> Besides the above two parameters, the **hrmpSenderDeposit** is also very important, as it states how many relay chain token deposit required for open the channel. On Rococo it is 0 ROC, but Polkadot takes 10 DOTs to open a channel and to accept it. Note that those funds need to be deposited into the parachain’s **sovereign account**.

Although we understand the two calls now, we cannot call them directly. Why? Because those two extrinsics a) happens on Rococo, and b) needs sudo privilege to call. Since none of the parachains has that permission they can’t use the `hrmp` extrinsic on Rococo directly. The way is to use `polkadotXcm.send` extrinsic from the parachain to send over the `hrmp` call as a payload.

## Relay chain encoded call
The first step is to prepare an encoded call data for the payload. Here we are using the `hrmp.hrmpInitOpenChannel()` as an example,

1. Open polkadot.js app in your browser and select Rococo,
2. Navigate to Developer -> Extrinsic
3. Find `hrmp.hrmpInitOpenChannel()` call and fill out the parameters
    - recipient: 2006
    - proposedMaxCapacity: 1000
    - proposedMaxMessageSize: 102400
4. Copy and store the encoded call data for later, in this case 0x3c00d6070000e803000000900100
5. Repeat step 1 to 4 to get the encoded call data for the hrmpAcceptOpenChannel.
![hrmp.hrmpInitOpenChannel() Screenshot](../../../assets/img/hrmp-channel/hmrpInitOpenChannel.png)

## Send the encoded call via XCM
Next, we explain how to send the payload via polkadotXcm pallet. Please make sure polkadot’s `pallet-xcm` pallet is integrated in your chain.

If you have a **sudo** account on your chain, you could construct the below polkadotXcm.send() call right from it. However, since Turing Staging has removed sudo, we are using Governance to execute the call below.

1. Open chain A’s [polkadot.js app](https://polkadot.js.org/apps).
2. Navigate to Governance -> Democracy, and click on Submit preimage.
3. Within submit preimage popup, select `polkadotXcm.send` with the below parameters, copy the **preimage hash**, and submit.
   - destination: V1 {XcmV1MultiLocation { parents: 1, interior: Here}}
   - message:
     - V2 (or latest supported version)
     - Add 5 instructions to the message
     - **WithdrawAsset**: {Concrete {0, Here}, Fungible {1000000000000}}
        
        The value is 1,000,000,000,000 units, or 1 ROC; 1 DOT or 1 KSM is sufficient to execute this, but the parachain’s sovereign account on the relay chain needs to be sufficiently funded.
     - **BuyExecution**: {Concrete {0, Here}, Fungible {1000000000000}, Unlimited}
        
        The number value is the same as that in WithdrawAsset

     - **Transact**: {Native, 1000000000, <encoded_call_data>}
        
        Use the encoded call data prepared above; the second parameter is max_weight, whose value is 1,000,000,000 and can’t be wrong.
     - **RefundSurplus**
     - **DepositAsset**: {Wild {All}, 1, {parents: 0, interior: X1(Parachain(2114))}}
        
        The 2114 is Chain A’s paraId
    
    The entire call will look like the below screenshot.
    ![polkadotXcm.send() Screenshot](../../../assets/img/hrmp-channel/polkadotxcm-send.png)
4. Navigate to Governance -> Council -> Motions, click on "Submit proposal", paste the above preimage hash and sign.
5. The external proposal should show up in Council -> Motions, and with enough Ayes it will move to Democracy -> external tab.
6. Then, Technical Committee can fast-track the external proposal for referendum, and the call will execute through referendum.
7. After call execution, go to [Rococo polkadot.js app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/chainstate) for verification. Calling `hrmp.hrmpOpenChannelRequest(sender: 2114, recipient: 2006)` will show the below result.
    ![hrmp.hrmpOpenChannelRequests() Screenshot](../../../assets/img/hrmp-channel/hrmpOpenChannelRequests.jpg)

That means the call has gone through! Once the other parachain successfully send `hrmp.hrmpAcceptOpenChannel()` the above requests will be removed from `hrmp.hrmpOpenChannelRequest` and the channel will show up in `hrmp.hrmpChannels()`.

You will need to send two such calls for both accepting request and initiating it (or you can prepare a batch call). Once channel has been accepted, it will become available at the start of next session.

## Relay Chain Specific Configuration

**Rococo**
```
proposedMaxCapacity: 1,000
proposedMaxMessageSize: 102,400
hrmpSenderDeposit: 0
hrmpRecipientDeposit: 0
tokenDecimals: 12
```

**Kusama**
```
proposedMaxCapacity: 1,000
proposedMaxMessageSize: 102,400
hrmpSenderDeposit: 5,000,000,000,000
hrmpRecipientDeposit: 5,000,000,000,000
tokenDecimals: 12
```

**Polkadot**
```
proposedMaxCapacity: 1,000
proposedMaxMessageSize: 102,400
hrmpSenderDeposit: 100,000,000,000
hrmpRecipientDeposit: 100,000,000,000
tokenDecimals: 10
```

## Turing Staging
Parachain sovereign account: 5Ec4AhNzVAVwDR54oqgWQ5YSoPbxXathSrQqTmqkF5o7xe6y

## Turing Network
Encoded account: `0x7061726142080000000000000000000000000000000000000000000000000000`\
[Turing open channel call](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/extrinsics/decode/0x29000101000214000400000000070088526a741300000000070088526a7400060003005ed0b2183c01dc070000140d010004000101007061726142080000000000000000000000000000000000000000000000000000) - do this call from sudo tab or via governance.

