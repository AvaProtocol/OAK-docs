---
title: Node Operator Requirements via partner services
subtitle: How to setup your node with one of our node infrastructure partner services
author: irsal
tags: [infra]
---

## Node Infrastructure Requirements
Since we've vetted these services, you can get many of the following with the out-of-the-box configurations that we've setup.
- Location: non-European countries
- At least 8 CPU cores.
- At least 16GB of RAM.
- At least 1TB of storage.
- Monitoring and alerting in place (Prometheus, Grafana, the like).

Please sync a few days before your intended collation / block production candidacy to sync the nodes. Once your node is synced, you will find that the block numbers are up to date with both the relay chain and the parachain. Check out the [Telemetry](https://telemetry.polkadot.io/#list/0x0f62b701fb12d02237a33b84818c11f621653d2b1614c777973babf4652b535d) site for more information.

----------------------------------------------------------------------------------------------------------------------------------

## Turing Staging Network - Testnet
*Turing Staging is a testnet, thus it will have maximal amount of chaos and will NOT have 100% uptime. This might be reset at a given time due to a number of different reasons. If you are a stakeholder (collator, dev, consumer) of this chain, please expect occassional instability, thus the ability to re-deploy your system as needed. The OAK team will always re-instate the same wallet amounts as before a reset occurs, so users should expect that for any given chain reset. If a chain reset is required, it will be announced via Discord.*

- [Turing Staging Chain Spec](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/turing-staging.json)
- [Rococo Chain Spec](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/resources/rococo.json)

## Turing Network
- [Turing Chain Spec](https://github.com/OAK-Foundation/OAK-blockchain/blob/master/node/res/turing.json)
- [Kusama Chain Spec](https://github.com/paritytech/polkadot/blob/master/node/service/res/kusama.json)

----------------------------------------------------------------------------------------------------------------------------------

## OnFinality

### Step 1: Setup your OnFinality account
Create an [OnFinality account](https://app.onfinality.io/signup), and add a payment method to your [Accounts](https://app.onfinality.io/account).

### Step 2: Dedicated Node selection
Once you've confirmed your account, you are ready to setup a node. Starting with navigating to the Dedicated Nodes section. 

![onfinality-setup-1](../../assets/img/node-operator/onfinality-setup-1.png)

Click on **Deploy New Node** Button, and this will direct you to a multi-step node infrastructure setup.

### Step 3: Node Setup
**Step 3.1: Search for the right network**

If you'd like to setup Turing, for example, search for "Turing" on the top right search box. Then click on that network spec.

![onfinality-setup-2](../../assets/img/node-operator/onfinality-setup-2.png)

**Step 3.2: Node Configuration**

The public network spec provided by the OAK Team has the recommended specs above, and is up to date. 
- For naming, please provide a name that you can identify, especially if you have multiple nodes. 
- Image Version: double check that this is in fact the latest node version to deploy. You can run into issues if you choose an older image for the node. Additionally, do a cross-reference with our [Github release page](https://github.com/OAK-Foundation/OAK-blockchain/releases) as well as Discord.
- Collator: Make sure you select "Collator" so that your node can produce blocks once on-boarded. If you accidentally choose archive or full node, you'll have to go through the setup process again, as it is not easy to convert from one type of node to the other.
- Cloud provider & region: We recommend changing up deployment locations and cloud providers. However, certain configurations can allow for a faster node sync time with OnFinality's [Lighting Restore](https://documentation.onfinality.io/support/Lightning-Restore.1651703824.html) feature.
- Node & storage size: We recommend sticking with the recommended size based on the public network spec.

![onfinality-setup-3](../../assets/img/node-operator/onfinality-setup-3.png)

**Step 3.3: Launch Configuration**
The parachain and relay chain argumen
ts should be up to date. However, it's always prudent to double check and cross-reference the respective chain specs. See relevant network sections above.

![onfinality-setup-4](../../assets/img/node-operator/onfinality-setup-4.png)

**Step 3.4: Confirmation**

Double check all of the parameters, configuration and costs. Once you're ready, click "Deploy Node".

![onfinality-setup-5](../../assets/img/node-operator/onfinality-setup-5.png)

### Step 4: Sync and observe your node
Once your node is successfully deployed, you can find it in the "Dedicated Nodes" section of the site. Click on your node and observe the following:
- Parachain blocks are syncing appropriately
- Relay chain blocks are syncing appropriately
- No configuration errors in the console log. You can find your console by clicking on "Console logs" on the top right hand. 
- CPU, Memory, and Storage are within reasonable range of use.

Wait and observe in this step until your node is fully synced to the relay chain and parachain. It's important that BOTH are synced. You can cross-reference the respective network blocks on the [PolkadotJS App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.turing.oak.tech#/explorer).

![onfinality-setup-6](../../assets/img/node-operator/onfinality-setup-6.png)

### Step 5: Rotate keys in your collator node
Once your node is fully synced, the next step is to setup an association with the node and its peers. To do so you need to generate a session key. The steps are as follows.

**Step 5.1: Grab the WSS address**

In the monitoring view of your node, click the "API Endpoints" button on the top right. You'll see a number of options. Stick with "RPC", and copy the "Websocket" address, starting with `wss://node-**`.

![onfinality-setup-7](../../assets/img/node-operator/onfinality-setup-7.png)

**Step 5.2: Navigate to PolkadotJS' RPC call**

Take the copied Websocket address, and navigate to PolkadotJS. For ease of reference, [here](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/rpc) is the local development default URL.

Paste the `wss://node-*` address under "custom endpoint" input field, and hit Enter or click "Switch" on the top of the panel. 

![onfinality-setup-8](../../assets/img/node-operator/onfinality-setup-8.png)

**Step 5.3: RPC call to rotate keys** 

Once your node's UI has loaded, then click on **Developer > RPC call** in the dropdown. Once your there your URL should look something like `https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fnode-12345-**#/rpc`. Please follow the following steps:
- 5.3.1: Call RPC `author.rotateKeys`. It should return a 0x string.
- 5.3.2: Very important! Save the 0x string safely. You will need this when registering as a collator. If you lose this, you can always re-run this call to grab the new session key.

If you're managing multiple nodes, you can also double check that the session key is associated with the node by calling `author.hasSessionKeys()` and inserting the session key you believe it's associated with.

![onfinality-setup-9](../../assets/img/node-operator/onfinality-setup-9.png)

### Step 6: Onboard your collator
Once you're fully synced, you're ready to on-board as a collator. Proceed to this page to move forward and to start producing blocks. [Collator On-boarding](../collators)

### Step 7: Secure your endpoints
Once you are on-boarded with your session keys, you need to close down your ports to secure your node by doing the following steps.

**Step 7.1: Get to the Launch Configuration edit screen**

Go back to the node view on the Onfinality UI. (Reminder: Dedicated Nodes > Click on your node)Then click on "Launch Configuration". After you see the command line parameters from Launch Configuration, click on Edit on the top right of the command line section. 

![onfinality-setup-10](../../assets/img/node-operator/onfinality-setup-10.png)

**Step 7.1: Disable ports**

Make sure you disable and edit the following to ensure that only you can access your node. 
- `--unsafe-ws-external` --> Toggle this OFF
- `--unsafe-rpc-external` --> Toggle this OFF
- Set `--rpc-methods` to `Safe`

![onfinality-setup-11](../../assets/img/node-operator/onfinality-setup-11.png)