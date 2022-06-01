---
title: Running a Turing node as a service
subtitle: Setting up systemd for your collator
author: andrew
tags: [infra]
---

# Running a Turing node as a service

Setting up your Turing collator node as a service allows the operating system to
keep your service running.

## Preparation

To prepare for setting up a systemd service for the OAK binary, you'll need the
following information:

1. `INSTALLATION_DIR`: Directory where downloaded the `oak-collator` binary
2. `NODE_NAME`: Custom identifier for your node
3. `DATA_DIR`: Directory where you would like to store OAK blockchain data
4. `NODE_KEY`: Key for running your collator
5. `USER`: User that the service should run as
6. `GROUP`: Group that the service should run as

## Installation

Once you have prepared the required information, you can use the following
service definition to run the OAK collator.  On Debian based distributions, this
file should be placed at `/etc/systemd/system/oak-collator.service`.

```
[Unit]
Description="OAK Collator"
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
  --state-cache-size=0 \
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
while operating an OAK node.

* `journalctl -u oak-collator`
    * View logs for the node. `man journalctl` for more filtering options.
* `systemctl restart oak-collator`
    * Restart the collator service 
