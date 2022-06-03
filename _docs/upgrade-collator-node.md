---
title: Upgrade a collator node
subtitle: Instructions on how to upgrade your node version
author: irsal
tags: [infra, collator]
---

Please join the [OAK Discord](https://discord.gg/7W9UDvsbwh) server to be notified of new node versions. This will be announced in technical updates channels. If are not diligent about upgrading to the lastest node version, your node may stop producing blocks and you will likely get less rewards (if you are part of the candidate pool).

The steps below should only cause 3-5 minutes of downtime for your node, if done properly.

## How to upgrade your node

### Step X: Get to your node
SSH to your target node, and make sure it's functioning properly by vetting Telemetry, and your monitoring/dashboards.

### Step X: Get the new binary ready

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

### Step X: Replace your old binary

#### Options 1 & 2
```bash
#!/usr/bin/env bash
set -ex
chain=turing # OR turing-staging
base_dir=/home/ubuntu
cp $chain-$version.zip /tmp
unzip -o /tmp/$chain-$version.zip -d $base_dir
```

#### Options 3
// TODO insert docker instructions

### Step X: Restart your service

#### Options 1 & 2
Restart the `oak-collator` service

```bash
sudo systemctl restart oak-collator
```

#### Options 3
// TODO insert docker instructions