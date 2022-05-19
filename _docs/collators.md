---
title: Collator Guide
subtitle: This document covers the operating and token requirements of a collator
author: irsal
tags: [dpos, collators]
---

## Pre-requisites to start producing blocks

Before you start producing blocks and earning rewards as a collator, you must first setup your node. Head over to the following pages for a tutorial on the node setup:

1. [Experienced Node Operators](../node-operator-requirements)
2. [Using our partner services](../node-operator-requirements-service)

If you have any questions or run into issues, head over to the [OAK Discord](https://discord.gg/7W9UDvsbwh) for help.

## Network Specific Information

### Neumann Network - Testnet

- [PolkadotJS Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/extrinsics) - use this to execute post calls or functions (e.g. signing up to be a collator)
- [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/chainstate) - use this to query fungible storage items (e.g. the number of selected candidates)
- [Chain Constants](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/chainstate/constants) - use this to query constants for the blockchain (e.g. any parameter with a `const` below)
- [Telemetry](https://telemetry.polkadot.io/#list/0x42e75532d6809775cef4b9ca8e4bb49be2dc1e87c9ff1ba299e78481b5cb3047)

| Field                                                                                     | Current Value                                                 |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Minimum Collator Bond `const parachainStaking.minCandidateStk`                            | 1MM NEU or `10000000000000000` planck                         |
| Number of selected candidates `parachainStaking.totalSelected`                            | 10                                                            |
| Round Length `parachainStaking.round`                                                     | 25 blocks or ~5 minutes                                       |
| Leave candidacy duration `const parachainStaking.leaveCandidatesDelay`                    | 2 rounds or ~10 minutes                                       |
| Reduction of self-delegation bond duration `const parachainStaking.revokeDelegationDelay` | 2 rounds or ~10 minutes                                       |
| Rewards payout `const parachainStaking.rewardPaymentDelay`                                | Time left to complete current round + 2 rounds or ~10 minutes |

_Note: The source of truth for the values above is the chain state and constants, so please query that to double-check the values_

### Turing Network - Kusama Parachain

- [PolkadotJS Extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/extrinsics) - use this to execute post calls or functions (e.g. signing up to be a collator)
- [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/chainstate) - use this to query fungible storage items (e.g. the number of selected candidates)
- [Chain Constants](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/chainstate/constants) - use this to query constants for the blockchain (e.g. any parameter with a `const` below)
- [Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

| Field                                                                                     | Current Value                                              |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Minimum Collator Bond `const parachainStaking.minCandidateStk`                            | 400K TUR or `4000000000000000` planck                      |
| Number of selected candidates `parachainStaking.totalSelected`                            | 24                                                         |
| Round Length `parachainStaking.round`                                                     | 600 blocks or ~2 hours                                     |
| Leave candidacy duration `const parachainStaking.leaveCandidatesDelay`                    | 24 rounds or ~48 hours                                     |
| Reduction of self-delegation bond duration `const parachainStaking.revokeDelegationDelay` | 24 rounds or ~48 hours                                     |
| Rewards payout `const parachainStaking.rewardPaymentDelay`                                | Time left to complete current round + 2 rounds or ~4 hours |

_Note: The source of truth for the values above is the chain state and constants, so please query that to double-check the values_

## How to register as a collator

### Step 1: Get your session keys

If you have gone through Step 5 of **[Using our partner services](../node-operator-requirements-service)**, you can skip all of Step 1, and proceed to Step 2. You will use that same session key for registration, so keep it handy.

**Option 1: Run a CLI command to grab your session keys**

If you are on a remote server, it is easier to run this command on the same machine (while the node is running with the default HTTP RPC port configured):

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The output will have a hex-encoded "result" field like `0xfoo123bar`. The result is the concatenation of the four public keys. Save this result for a later step.

**Option 2: Use the PolkadotJS App**

Navigate to our other documentation to use the PolkadotJS app to rotate keys. Navigate Step 5 of of **[Using our partner services](../node-operator-requirements-service)**. You'll need to have an open websocket to your node to be able to execute this via PolkadotJS UI.

### Step 2: Set your session keys

**Step 2.1: Head over to the Developer -> Chain state tab in PolkadotJS**
Once you're in the extrinsics tab find `session.setKeys`.

![collator-setup-1](../../assets/img/collators/collator-setup-1.png)

**Step 2.2: Set your session keys**
Take the result from Step 1.1, in our example `0xfoo123bar`, input the following fields:

- wallet: Choose the wallet you intend to use to join as a candidate. In other words, the wallet that has your collator bond ready.
- keys: `0xfoo123bar`
- proof: `0x0`

### Step 3: Figure out the size of the candidate set

As part of a later call, you will need to know how large the current candidate pool is. To compute that, you'll need to navigate to **the Storage tab under Developer -> Chain state**,  and call `parachainStaking.candidatePool`. This is returned as an array, you'll need to count the number of candidates.

![collator-setup-2](../../assets/img/collators/collator-setup-2.png)

### Step 4: Join the candidate set

In the **Developer -> Extrinsics** tab, navigate to `parachainStaking.joinCandidates`.

Once you've set your session keys, use the same wallet from Step 2.2 to signup as a candidate. Make sure you have enough tokens for the bond amount, fees and existential deposit left over.

- wallet: the same wallet you registered your session keys with from Step 2.2
- bond: `4000000000000000` (this is the minimum bond from above; you can certainly bond more if you wish)
- candidateCount: `6` (take the number from Step 2 and increment by 1; so from the example above 5+1 = 6)

If the wallet selected doesn’t have more tokens than the minimum bond + a little transaction fee, the extrinsic call will fail and your wallet will not be added to the candidate pool.

![collator-setup-3](../../assets/img/collators/collator-setup-3.png)

### Step 4: Confirm your candidacy

Similar to Step 3, you'll have to navigate to the chain state page, and call `parachainStaking.candidatePool` and search for your wallet address in the array returned.

### Step 5: Wait

Top delegated collators will be part of the active set, which is set / chosen at the beginning of each round.

## How to leave as a collator

There are two ways to leave as a collator.

### Option 1: Short-term leave

If you need to run node upgrades and other maintenance operations, you can navigate to the extrinsics page and call `parachainStaking.goOffline`. This allows you to leave as a candidate without unbonding. You can return by calling `parachainStaking.goOnline`.

![collator-setup-4](../../assets/img/collators/collator-setup-4.png)

### Option 2: Long-term leave

If you need to leave the candidate set and unbond, you have to perform two calls.

**Call #1**
Navigate to the extrinsics tab, and go to `parachainStaking.scheduleLeaveCandidates` with the candidateCount re-computed from Step 3 above. Note that the candidateCount may have increased or decreased since you last did Step 3.

![collator-setup-5](../../assets/img/collators/collator-setup-5.png)

**Call #2**
Navigate to the extrinsics tab, and go to `parachainStaking.executeLeaveCandidates` with the candidateCount re-computed from Step 3 above.

![collator-setup-6](../../assets/img/collators/collator-setup-6.png)

If the call succeeds, you are removed from the pool of candidates so you cannot be selected for future collator sets, but you are not unbonded until their exit request (Call #2) is executed. Please note that this is not an instant execution, you'll need to wait for the "Leave candidacy duration" from the table(s) above.

## FAQ

For any questions or support, please reach out via [OAK Discord](https://discord.gg/7W9UDvsbwh), or email <collators@oak.tech>.

### When will my collator start producing blocks?
Collators start producing blocks 2 rounds after they become the `parachainStaking.selectedCandidates`.

For example, in Turing, if you've joined as a collator candidate, and you are considered as one of the top delegated collators, you can call `parachainStaking.round` in the chain state, you will see the following output.

```
{
  current: 88
  first: 200,737
  length: 600
}
```
Because you opted to join sometime during this round, you can calculate the `FIRST_BLOCK_NUMBER_OF_ROUND + 1800`, which would mean you can expect to start producing blocks at `202,537`.
