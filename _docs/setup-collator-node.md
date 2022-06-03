---
title: Setup a collator node
subtitle: Technical infrastructure requirements to run your node
author: irsal
tags: [infra, collator]
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

## Helpful Resources
You may not have a need for all of these resources, but they can be useful to cross-reference or for debugging.

Please read over using [how to use a service](../run-node-service) to run your node. 

### Turing Network - Kusama Parachain
The Turing Network is live on Kusama. If you're interested in collating, please reach out via [OAK Discord](https://discord.gg/7W9UDvsbwh), or email <collators@oak.tech>. You will need to meet the minimum bond found in [the collator on-boarding page](../collators/#turing-network---kusama-parachain).

- [Latest binary](https://github.com/OAK-Foundation/OAK-blockchain/releases/latest)
- [Docker image repository](https://hub.docker.com/repository/docker/oaknetwork/turing)
- [Turing Network parachain chain spec](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/turing.json)
- [Kusama chain spec](https://github.com/paritytech/polkadot/blob/master/node/service/res/kusama.json)
- [Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

## How to setup your node

### Step 1: Get your binary ready

#### Option 1: Grab a compiled binary from OAK's Github
If you are using Ubuntu (20.04+ LTS x64), you can run the binary compiled by OAK that can be found in a zip [here](https://github.com/OAK-Foundation/OAK-blockchain/releases/latest). You'll use this to run your collator on your node. To acquire a copy of this via command line, use the commands below.

```
chain=turing
latest_url=$(curl -Lsf -w %{url_effective} https://github.com/OAK-Foundation/OAK-blockchain/releases/latest/download/)
version=${latest_url##*/}
wget https://github.com/OAK-Foundation/OAK-blockchain/releases/download/$version/${chain}-${version}.zip
unzip ${chain}-${version}.zip
```

#### Option 2: Compile the binary
If you are using another machine, or are struggling with errors from the above, you may need to compile the binary within your node. If you're running a different OS, please compile the binary first and follow the instructions in the OAK-blockchain [README](https://github.com/OAK-Foundation/OAK-blockchain#install-oak-blockchain). For example, for the v1.4.0 binary, you can run the following command on your node.

```
git clone git@github.com:OAK-Foundation/OAK-blockchain.git    
git checkout v1.4.0
```

Then build your executable.

```
cargo build --release --features turing-node
```

#### Option 3: Grab the latest image from Docker
*Note regarding Docker: while we do support Docker images, we generally do not recommend this option unless you're testing. Docker builds are less performant when running nodes than using the binary paths above.*

If you choose to run the collator via Docker, you can find the Docker repository linked in the helpful resources above. You can grab the latest image (tagged `latest`), or the specific version. Create a volume for your data and check that the volume exists by inspecting. The following commands help you to do so.

```
docker pull oaknetwork/turing:1.4.0
docker volume create turing-data
docker volume inspect turing-data
```

### Step 2: Grab and save your node-key

Follow [these instructions](https://docs.substrate.io/v3/tools/subkey/#generating-node-keys) to generate the `NODE_KEY` below. We recommend folks save the secret of the node key somewhere safe.

### Step 3: Startup the parachain
#### Option 1 & 2: Run the binary
If you're using a Linux box, you can simply run the following for Turing:
```
oak-collator \
  --name=YOUR_COLLATOR_NAME \
  --base-path=PATH_TO_DATA_DIR \
  --chain=turing \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  --state-cache-size=0 \
  -- \
  --execution=wasm \
  --no-telemetry
```

It's important that we keep the state-cache-size to 0 for now. It causes downstream node issues down the road which will require more overhead for the node operator.

#### Option 3: Docker users
If you're using a Linux box, you can simply run the following for Turing:
```
docker run -d -p 30333:30333 -p 9944:9944 -p 9933:9933  -v turing-data:/data oaknetwork/turing:1.4.0 \
  --name=YOUR_COLLATOR_NAME \
  --base-path=/data \
  --chain=turing \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  --state-cache-size=0 \
  -- \
  --execution=wasm \
  --no-telemetry
```

### Step 4: Check that your node is in the Telemetry list and is connected to the network
If you're successful in connecting to the network and sending your Telemetry data, you can see your node's name (`YOUR_COLLATOR_NAME`) on either Telemetry dashboards for the
 [Turing Network](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

### Step 5: Sync your node
Please ensure that both the relay chain block number and parachain block number are up to the latest block number. The logs will indicate whether or not the nodes are fully synced.
While you're blocks are syncing, monitor the initialization, especially for the first few lines to ensure that you are pointing to the correct network. If you run into any issues, head over to the [OAK Discord](https://discord.gg/7W9UDvsbwh) for help.

### Step 6: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. [Collator On-boarding](../collators)
