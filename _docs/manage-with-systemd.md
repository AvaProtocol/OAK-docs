---
title: Manage collator with systemd
subtitle: Setting up systemd service for your collator for automatic startup, monitoring and log management
author: chris
tags: [infra, collator]
date: 2022-06-01
---
`systemd` and its associated command `systemctl` are fundamental elements of most modern Linux distributions. They offer a host of advantages when it comes to managing and controlling system services, including various applications. In this guide, we'll walk you through the process of setting up a service for the `oak-collator` program. This setup ensures that the `oak-collator` automatically restarts after system reboot or unexpected program shutdown, enhancing its reliability and ease of use.

## Preparation

To prepare for setting up a `systemd` service for the Ava Protocol binary, you'll need the
following information:

1. `INSTALLATION_DIR`: Directory where downloaded the `oak-collator` binary
2. `NODE_NAME`: Custom identifier for your node
3. `DATA_DIR`: Directory where you would like to store Ava Protocol blockchain data
4. `NODE_KEY`: Key for running your collator
5. `USER`: User that the service should run as
6. `GROUP`: Group that the service should run as

## Installation

Once you have prepared the required information, you can use the following
service definition to run the Ava Protocol collator.  On Debian based distributions, this
file should be placed at `/etc/systemd/system/oak-collator.service`.

```
[Unit]
Description="Ava Protocol Collator"
After=network.target
StartLimitIntervalSec=0

[Service]
ExecStart=INSTALLATION_DIR/oak-collator \
  --name=NODE_NAME \
  --base-path=DATA_DIR \
  --chain=turing \
  --node-key=NODE_KEY \
  --collator \
  --force-authoring \
  --execution=wasm \
  -- \
  --execution=wasm \
  --no-telemetry

Type=simple
Restart=on-failure
RestartSec=10
KillSignal=SIGHUP
User=USER
Group=GROUP

[Install]
WantedBy=multi-user.target
```

After you have created the service definition, you can enable and start the
service using `systemctl`:

```
systemctl enable oak-collator
systemctl start oak-collator
```

## Usage

systemd will automatically start your collator when you restart your system or
if the process is killed. Here are some other commands that might be useful
while operating an Ava Protocol node.

* `systemctl status oak-collator --no-pager --full`
  
  Get the running status of the program. The `--no-pager` option will avoid text cutoff from long lines. 
* `journalctl -u oak-collator -f`
  
  View logs of the program. The `-f` will follow and stream the latest lines. For more display options please refer to the instructions in `man journalctl`.
* `systemctl restart oak-collator`
  
  Restart the collator service 

## Monitoring & Alerting

Since Ava Protocol is a Substrate-based project, you can use Node Exporter, Prometheus and Grafana to monitor your nodes. For more information, please follow [this Substrate tutorial](https://docs.substrate.io/tutorials/v3/node-metrics/).
