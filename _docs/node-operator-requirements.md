---
title: Node Operator Requirements
subtitle: Technical infrastructure requirements to run your node
author: irsal
tags: [infra]
---

## Node Infrastructure Requirements
On our path to decentralization and trustlessness, collators are a very important piece of the puzzle. We must maintain a high level of performance (as close to a 12 second block production time as possible), and a high degree of availability. As such, the Foundation must prescribe certain technical specifications when onboarding node operators. 
Bare metal over cloud, especially when costs are a consideration to the node operator.
- High internet connection (5 gigabits per second).
- At least 8 CPU cores (fastest core speed).
- At least 16GB of RAM.
- At least 1TB of storage.
- Monitoring and alerting in place (Prometheus, Grafana, the like).

Please sync a few days before your intended collation / block production candidacy to sync the nodes. Once your node is synced, you will find that the block numbers are up to date with both the relay chain and the parachain. Check out the [Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d) site for more information.

## Ports

Please ensure the following configuration for your node.
- P2P port must be open to incoming traffic:
    - Source: Any
    - Destination: 30333, 30334 TCP

## Performance Incentives
We will need to ensure that collators are economically incentivized to have the most optimal node infrastructure in place to do what’s best for the network at large. While initially we are not implementing slashing, however, it would be to the benefit of the collator to have the requirements above to ensure that they can receive their rewards and get chosen from the collator pool.

For now, the incentives are purely rewards based since we've vetted a closed set of community collators with a solid reputation in the DotSama ecosystem. 

## Neumann Network - Testnet
> Neumann is a testnet, thus it will have maximal amount of chaos and will NOT have 100% uptime. This might be reset at a given time dur to a number of different reasons. If you are a stakeholder (collator, dev, consumer) of this chain, please expect occassional instability, thus the ability to re-deploy your system as needed. The OAK team will always re-instate the same wallet amounts as before a reset occurs, so users should expect that for any given chain reset. If a chain reset is required, it will be announced via Discord.

### Step X: Grab the latest binary
https://github.com/OAK-Foundation/OAK-blockchain/releases/tag/v1.2.8

### Step X: Grab the latest parachain chain spec
https://github.com/OAK-Foundation/OAK-blockchain/blob/master/resources/neumann.json

### Step X: Grab the latest oak-hosted-relay chain spec
https://github.com/OAK-Foundation/OAK-blockchain/blob/master/resources/rococo-testnet.json

### Step X: Double check the boot nodes for both parachain and relay chain
#### Parachain Bootnode Parameters
```
tbd
```

#### OAK hosted Relay Bootnode Parameters
```
tbd
```
[Source Code](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/resources/rococo-testnet.json)

### Step X: Grab and save your node-key

Follow [these instructions](https://docs.substrate.io/v3/tools/subkey/#generating-node-keys) to generate the `NODE_KEY` below. We recommend folks save the secret of the node key somewhere safe.

### Step X: Run the following command on your node 
```
oak-collator \
  --name=COLLATOR_NAME \
  --base-path=PATH_TO_DATA_DIR \
  --chain=PATH_TO_PARACHAIN_SPEC \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  --state-cache-size=0 \
  -- \
  --chain=PATH_TO_RELAY_CHAIN_SPEC \
  --execution=wasm \
  --no-telemetry \
  --bootnodes RELAY_CHAIN_BOOTNODE_P2P_ADDRESS \
  --bootnodes RELAY_CHAIN_BOOTNODE_P2P_ADDRESS \
  --bootnodes RELAY_CHAIN_BOOTNODE_P2P_ADDRESS
```
It's important that we keep the state-cache-size to 0 for now. It causes downstream node issues down the road which will require more overhead for the node operator.

### Step X: Sync your node
Please ensure that both the relay chain block number and parachain block number are up to the latest block number. The logs will indicate whether or not the nodes are fully synced.

### Step X: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. ![Collator On-boarding](./collators.md)

----------------------------------------------------------------------------------------------------------------------------------
## Turing Staging Network - Rococo Testnet
Coming soon...
----------------------------------------------------------------------------------------------------------------------------------
## Turing Network - Kusama Parachain 
### Step X: Grab the latest binary
https://github.com/OAK-Foundation/OAK-blockchain/releases/tag/v1.2.8

### Step X: Grab the parachain chain spec
https://github.com/OAK-Foundation/OAK-blockchain/blob/master/resources/turing-live-chain-spec.json

### Step X: Grab the Kusama chain spec
https://github.com/paritytech/polkadot/blob/master/node/service/res/kusama.json

### Step X: Double check the boot nodes for both parachain and relay chain
#### Parachain Bootnode Parameters
```
"/dns4/node-6914661379459780608-0.p2p.onfinality.io/tcp/11509/ws/p2p 12D3KooWPPAxTYwLeD7g6qkKnHaBwTQJReM99tsPr5Hme1mfH99u",
"/dns4/oak-turing-bootnode-01.bdnodes.net/tcp/30333/p2p/12D3KooWL9phojBkHLWaATRmzjh4YN6NKtdGPufNpPegHF3NDios",
"/ip4/52.54.129.175/tcp/30333/ws/p2p/12D3KooWP9zsTXEzP2KHd7p2vGyjBvb9kpTQPmwgsSSDve3RdthQ",
"/ip4/52.7.253.72/tcp/30333/ws/p2p/12D3KooWS8HqfDjWtNHYJJUANfufEAC6rGKaZHMznhTinsdESL2Q"
```

#### Kusama Bootnode Parameters
```
"/dns/p2p.0.kusama.network/tcp/30333/p2p/12D3KooWJDohybWd7FvRmyeGjgi56yy36mRWLHmgRprFdUadUt6b",
"/dns/p2p.1.kusama.network/tcp/30333/p2p/12D3KooWC7dnTvDY97afoLrvQSBrh7dDFEkWniTwyxAsBjfpaZk6",
"/dns/p2p.2.kusama.network/tcp/30333/p2p/12D3KooWGGK6Mj1pWF1bk4R1HjBQ4E7bgkfSJ5gmEfVRuwRZapT5",
"/dns/p2p.3.kusama.network/tcp/30333/p2p/12D3KooWRp4qgusMiUobJ9Uw1XAwtsokqx9YwgHDv5wQXjxqETji",
"/dns/p2p.4.kusama.network/tcp/30333/p2p/12D3KooWMVXPbqWR1erNKRSWDVPjcAQ9XtxqLTVzV4ccox9Y8KNL",
"/dns/p2p.5.kusama.network/tcp/30333/p2p/12D3KooWBsJKGJFuv83ixryzMsUS53A8JzEVeTA8PGi4U6T2dnif",
"/dns/kusama-bootnode-0.paritytech.net/tcp/30333/p2p/12D3KooWSueCPH3puP2PcvqPJdNaDNF3jMZjtJtDiSy35pWrbt5h",
"/dns/kusama-bootnode-0.paritytech.net/tcp/30334/ws/p2p/12D3KooWSueCPH3puP2PcvqPJdNaDNF3jMZjtJtDiSy35pWrbt5h",
"/dns/kusama-bootnode-1.paritytech.net/tcp/30333/p2p/12D3KooWQKqane1SqWJNWMQkbia9qiMWXkcHtAdfW5eVF8hbwEDw"
```
[Source Code](https://github.com/paritytech/polkadot/blob/master/node/service/res/kusama.json)

### Step X: Run the following command on your node 
```
oak-collator \
  --name=COLLATOR_NAME \
  --base-path=PATH_TO_DATA_DIR \
  --chain=turing \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  --state-cache-size=0 \
  -- \
  --chain=PATH_TO_RELAY_CHAIN_SPEC \
  --execution=wasm \
  --no-telemetry \
  --bootnodes RELAY_CHAIN_BOOTNODE_P2P_ADDRESS \
  --bootnodes RELAY_CHAIN_BOOTNODE_P2P_ADDRESS \
  --bootnodes RELAY_CHAIN_BOOTNODE_P2P_ADDRESS
```
It's important that we keep the state-cache-size to 0 for now. It causes downstream node issues down the road which will require more overhead for the node operator.

### Step X: Sync your node
Please ensure that both the relay chain block number and parachain block number are up to the latest block number. The logs will indicate whether or not the nodes are fully synced.

### Step X: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. ![Collator On-boarding](./collators.md)

----------------------------------------------------------------------------------------------------------------------------------
## OAK Network - Polkadot Parachain
This chain is not live yet. We target launch to be 4Q2022.