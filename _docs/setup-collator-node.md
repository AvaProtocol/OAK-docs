---
title: Set up a collator
subtitle: Technical infrastructure requirements to run your node
author: chris
tags: [infra, collator]
date: 2022-06-01
---

## Node Infrastructure Requirements
On our path to decentralization and trustlessness, collators are a very important piece of the puzzle. We must maintain a high level of performance (as close to a 12 second block production time as possible), and a high degree of availability. As such, the Foundation must prescribe certain technical specifications when onboarding node operators. 

- Network: 1Gbit/s
- CPU: 4.2GHz
    - We use Intel Xeon E-2388G processors
- RAM: 16GB
- Storage: 1TB NVMe

We recommend using a dedicated server instead of a virtual machine from a cloud provider to ensure maximum single-thread performance.

Be sure to monitor your collator with tooling like Prometheus and Grafana.

Please sync a few days before your intended collation / block production candidacy to sync the nodes. Once your node is synced, you will find that the block numbers are up to date with both the relay chain and the parachain. Check out the [Turing Network Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d) site for more information.

## Ports
Please ensure the following configuration for your node.
- P2P port must be open to incoming traffic:
    - Source: Any
    - Destination: 30333, 30334 TCP

## Performance Incentives
We will need to ensure that collators are economically incentivized to have the most optimal node infrastructure in place to secure and do what’s best for the network at large. While initially we are not implementing slashing, it would be to the benefit of the collator to have the requirements above to ensure that they can receive their rewards and get chosen from the collator pool.

For now, the incentives are purely rewards based since we've vetted a closed set of community collators with a solid reputation in the DotSama ecosystem.

### Turing Network - Kusama Parachain
The Turing Network is live on Kusama. If you're interested in collating, please reach out via [OAK Discord](https://discord.gg/7W9UDvsbwh), or email <collators@oak.tech>. You will need to meet the minimum bond found in [the collator on-boarding page](../collators/#turing-network---kusama-parachain).

- [Latest binary](https://github.com/OAK-Foundation/OAK-blockchain/releases/latest)
- [Docker image repository](https://hub.docker.com/repository/docker/oaknetwork/turing)
- [Turing Network parachain chain spec](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/turing.json)
- [Kusama chain spec](https://github.com/paritytech/polkadot/blob/master/node/service/res/kusama.json)
- [Turing Network Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

## Set up a collator

### Step 1 - Create a wallet for your collator

In this step, we'll generate a node key for your collator. The simplest method to accomplish this is by using Substrate's [Subkey command-line tool](https://docs.substrate.io/reference/command-line-tools/subkey/). After you've installed the tool, execute the command subkey `generate-node-key`. This command will yield two lines of output. The first line represents a new Substrate wallet address, and the second line is its corresponding private key.

### Step 2 - Start up the collator program

#### Option 1: Download a release binary(Recommended)
If you're running Ubuntu (20.04+ LTS x64), you can utilize the binary compiled by OAK, available on our [Latest Release](https://github.com/OAK-Foundation/OAK-blockchain/releases/latest) page. This binary will enable you to operate your collator on your node. To download it via command line, follow the commands detailed below.

```bash
latest_url=$(curl -Lsf -w %{url_effective} https://github.com/OAK-Foundation/OAK-blockchain/releases/latest/download/)
version=${latest_url##*/}
echo $version
```

The `echo` command will print out the version of the collator to be installed. Then, run the below command to download a .deb file, unpackage it and install the binary.

```bash
# Download the latest .deb file
curl -L https://github.com/OAK-Foundation/OAK-blockchain/releases/download/$version/oak-collator.deb -o oak-collator-$version.deb

# Unpackage and install the .deb file
sudo dpkg -i oak-collator-$version.deb
```

After the binary is setup, you can check it via the below command.

```bash
whereis oak-collator  # print out the installed location
oak-collator --help
```

Now you can simply run the following to start a collator for Turing Network. Optionally, you could add the `--pruning=archive` parameter to prune the state of early blocks in order to save disk space.

```bash
oak-collator \
  --name=<collator_name> \
  --base-path=<path_to_blockchain_data> \
  --chain=turing \
  --node-key=<node_key_created_in_step_1> \
  --collator \
  --force-authoring \
  --execution=wasm \
  -- \
  --execution=wasm \
  --no-telemetry
```

To ensure maximum uptime, we advise you to consult our guide for automatically restoring the collator program upon server startup or in case of failure. For more detailed instructions, please refer to our [Manage collator with systemd](../manage-with-systemd.md) page next.

#### Option 2: Compile from source code
If you machine runs a different architecture, or you are struggling with binaries from the above, you may need to compile the binary within your node. If you're running a different OS, please compile the binary first and follow the instructions in the OAK-blockchain [README](https://github.com/OAK-Foundation/OAK-blockchain). For example, for the v1.9.0 binary, you can run the following command on your node.

```bash
git clone git@github.com:OAK-Foundation/OAK-blockchain.git
git fetch --all --tags
git checkout tags/v1.9.0 -b branch-1.9.0

Switched to a new branch 'branch-1.9.0'
```

Then build your executable with `cargo build`.

```bash
cargo build --release --features turing-node
```

Afterwards, run the following to start a collator for Turing Network. Optionally, you could add the `--pruning=archive` parameter to prune the state of early blocks in order to save disk space.

```bash
oak-collator \
  --name=<collator_name> \
  --base-path=<path_to_blockchain_data> \
  --chain=turing \
  --node-key=<node_key_created_in_step_1> \
  --collator \
  --force-authoring \
  --execution=wasm \
  -- \
  --execution=wasm \
  --no-telemetry
```

To ensure maximum uptime, we advise you to consult our guide for automatically restoring the collator program upon server startup or in case of failure. For more detailed instructions, please refer to our [Manage collator with systemd](../manage-with-systemd.md) page next.

#### Option 3: Pull Docker image
*Note regarding Docker: while we do support Docker images, we generally do not recommend this option unless you're testing. Docker builds are less performant when running nodes than using the binary paths above.*

If you opt to run the collator using Docker, you'll find the Docker builds on [Ava Protocol’s DockerHub](https://hub.docker.com/r/oaknetwork/turing/tags). Begin by pulling the latest image and creating a volume for your data. You can confirm the volume's creation by conducting an inspection. The following commands will guide you through these steps.

```bash
docker pull oaknetwork/turing:latest
docker volume create turing-data
docker volume inspect turing-data
```

Then, configure and `docker run` to start the program.
```bash
docker run -d -p 30333:30333 -p 9944:9944 -p 9933:9933  -v turing-data:/data oaknetwork/turing:latest \
  --name=<collator_name> \
  --base-path=/data \
  --chain=turing \
  --node-key=<node_key_created_in_step_1> \
  --collator \
  --force-authoring \
  --execution=wasm \
  -- \
  --execution=wasm \
  --no-telemetry
```

### Step 3: Check that your node is in the Telemetry list and is connected to the network
If you're successful in connecting to the network and sending your Telemetry data, you can see your node's name (`<collator_name>`) on 
 [Turing Network Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d)

### Step 4: Sync your node
Please ensure that both the relay chain block number and parachain block number are up to the latest block number. The logs will indicate whether or not the nodes are fully synced.
While you're blocks are syncing, monitor the initialization, especially for the first few lines to ensure that you are pointing to the correct network. If you run into any issues, head over to the [OAK Discord](https://discord.gg/7W9UDvsbwh) for help.

### Step 5: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. [How to register as a collator](../collators/#how-to-register-as-a-collator)

## Setup a RPC node

Oak provide an RPC which everyone can use at rpc.turing.oak.tech. It handle both of JSON RPC and websocket request.

If you plan to run a node to serve RPC yourself, or have been running a RPC you can use these below parameter:

```
oak-collator --rpc-max-connections=1000 --rpc-cors=all
```

If you want to lock down to a specific hostname you can use:

```
oak-collator --rpc-max-connections=1000 --rpc-cors=wss://host-name,https://host-name
```

### 2.1.0 upgrade

If you have been upgrade from pre 2.1.0 you need to adjust your RPC param as below

1. we no longer need to specify `ws-port` for parachain. all the `ws-*` param is removed.
2. you would need to move those into `rpc` such as `--rpc-max-connections=5000 --rpc-cors=all`


### Common issues

#### Memory consumption is high and not going down

If you are running into a memory issue where oak-collator memory consumption won't go down, you can try to work-around this by disabling relay chain block pruning using the below parameter

```
oak-collator parachain-param ... \
 -- \
 --normal-relaychain-param-here \
 --blocks-pruning=archive --state-pruning=archive
```

You can monitor the memory with command such as 

```
free -h

# Example output
              total        used        free      shared  buff/cache   available
Mem:          7.6Gi       3.6Gi       1.4Gi        78Mi       2.6Gi       3.6Gi
Swap:            0B          0B          0B
```

Or using tool such as `htop`(available on apt with `apt-get install htop`) and observe that the memory only grow up rapidly and eventually lead to an OOM and being kill by the kernel.

OOM log can also see with `dmesg` and search for `Out of memory`, `Kill process`

