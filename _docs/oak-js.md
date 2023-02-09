---
title: Javascript SDK oak.js
subtitle: Use javascript to interact with the OAK Blockchain
author: justin
tags: [api, time, triggers, js, sdk]
date: 2022-09-13
---

The OAK Development team has created an extension of the PolkadotJS APIs in **[this repository](https://github.com/OAK-Foundation/oak.js)**.

To start usage, please run:
```bash
npm install @oak-foundation/api-augment @oak-foundation/types
```

An example snippet can be seen below.
```javascript
import '@oak-foundation/api-augment'
import { rpc } from '@oak-foundation/types';
import { ApiPromise, WsProvider } from '@polkadot/api'

async function main() {
  const api = await ApiPromise.create({
    provider: new WsProvider("wss://rpc.turing-staging.oak.tech"),
    rpc: rpc,
  });

  const alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
  const taskId = await api.rpc.automationTime.generateTaskId(alice, "example_provided_it");
  console.log("TaskId:", taskId.toHuman());
}
main().catch(console.error).finally(() => process.exit()); 
```

You can find more examples in our [Javascript Example Repo](https://github.com/OAK-Foundation/javascript-examples).
