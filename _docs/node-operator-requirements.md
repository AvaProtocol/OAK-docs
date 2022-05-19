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
We will need to ensure that collators are economically incentivized to have the most optimal node infrastructure in place to secure and do what’s best for the network at large. While initially we are not implementing slashing, it would be to the benefit of the collator to have the requirements above to ensure that they can receive their rewards and get chosen from the collator pool.

For now, the incentives are purely rewards based since we've vetted a closed set of community collators with a solid reputation in the DotSama ecosystem. 

## Neumann Network - Testnet
*Neumann is a testnet, thus it will have maximal amount of chaos and will NOT have 100% uptime. This might be reset at a given time due to a number of different reasons. If you are a stakeholder (collator, dev, consumer) of this chain, please expect occasional instability, thus the ability to re-deploy your system as needed. The OAK team will always re-instate the same wallet amounts as before a reset occurs, so users should expect that for any given chain reset. If a chain reset is required, it will be announced via Discord.*

### Step 1: Grab the latest binary [here](https://github.com/OAK-Foundation/OAK-blockchain/releases/latest)

### Step 2: Grab the latest parachain chain spec [here](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/neumann.json)

### Step 3: Grab the latest oak-hosted-relay chain spec [here](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/neumann-rococo-testnet.json)

### Step 4: Grab and save your node-key

Follow [these instructions](https://docs.substrate.io/v3/tools/subkey/#generating-node-keys) to generate the `NODE_KEY` below. We recommend folks save the secret of the node key somewhere safe.

### Step 5: Startup the parachain
If you're using ubuntu, you can simply run the following:
```
oak-collator \
  --name=YOUR_COLLATOR_NAME \
  --base-path=PATH_TO_DATA_DIR \
  --chain=PATH_TO_CHAIN_SPEC_FILE \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  --state-cache-size=0 \
  -- \
  --chain=PATH_TO_RELAY_CHAIN_SPEC \
  --execution=wasm \
  --no-telemetry
```
It's important that we keep the state-cache-size to 0 for now. It causes downstream node issues down the road which will require more overhead for the node operator.

If you're running a different OS, please compile the binary first and follow the instructions in the OAK-blockchain [README](https://github.com/OAK-Foundation/OAK-blockchain#install-oak-blockchain)

### Step 6: Check that your node is in the Telemetry list and is connected to the network
If you're successful in connecting to the network and sending your Telemetry data, you can see your node's name (`YOUR_COLLATOR_NAME`) on [this list](https://telemetry.polkadot.io/#list/0x42e75532d6809775cef4b9ca8e4bb49be2dc1e87c9ff1ba299e78481b5cb3047).

### Step 7: Sync your node
Please ensure that both the relay chain block number and parachain block number are up to the latest block number. The logs will indicate whether or not the nodes are fully synced.
While you're blocks are syncing, monitor the initialization, especially for the first few lines to ensure that you are pointing to the correct network. If you run into any issues, head over to the [OAK Discord](https://discord.gg/7W9UDvsbwh) for help.

### Step 8: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. [Collator On-boarding](./collators.md)

----------------------------------------------------------------------------------------------------------------------------------
## Turing Staging Network - Rococo Testnet
Coming soon...to test XCMP.

----------------------------------------------------------------------------------------------------------------------------------
## Turing Network - Kusama Parachain 
### Step 1: Grab the latest binary [here](https://github.com/OAK-Foundation/OAK-blockchain/releases/latest)

### Step 2: Grab the parachain chain spec [here](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/turing.json)

### Step 3: Grab the Kusama chain spec [here](https://github.com/paritytech/polkadot/blob/master/node/service/res/kusama.json)

### Step 4: Grab and save your node-key

Follow [these instructions](https://docs.substrate.io/v3/tools/subkey/#generating-node-keys) to generate the `NODE_KEY` below. We recommend folks save the secret of the node key somewhere safe.

### Step 5: Run the following command on your node 
```
oak-collator \
  --name=YOUR_COLLATOR_NAME \
  --base-path=PATH_TO_DATA_DIR \
  --chain=PATH_TO_CHAIN_SPEC_FILE \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  --state-cache-size=0 \
  -- \
  --chain=PATH_TO_RELAY_CHAIN_SPEC \
  --execution=wasm \
  --no-telemetry
```
It's important that we keep the state-cache-size to 0 for now. It causes downstream node issues down the road which will require more overhead for the node operator.

If you're running a different OS, please compile the binary first and follow the instructions in the OAK-blockchain [README](https://github.com/OAK-Foundation/OAK-blockchain#install-oak-blockchain)

### Step 6: Check that your node is in the Telemetry list and is connected to the network
If you're successful in connecting to the network and sending your Telemetry data, you can see your node's name (`YOUR_COLLATOR_NAME`) on [this list](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d).

### Step 7: Sync your node
Please ensure that both the relay chain block number and parachain block number are up to the latest block number. The logs will indicate whether or not the nodes are fully synced.

### Step 8: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. [Collator On-boarding](../collators)

----------------------------------------------------------------------------------------------------------------------------------
## OAK Network - Polkadot Parachain
This chain is not live yet. We target launch to be 4Q2022.