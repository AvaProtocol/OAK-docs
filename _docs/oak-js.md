---
title: OAK.js
subtitle: Use javascript to interact with the OAK Blockchain
author: justin
tags: [api, time, triggers, js, sdk]
---

The OAK Development team has created an extension of the PolkadotJS APIs in **[this repository](https://github.com/OAK-Foundation/oak.js)**.

To start usage, please run:
```bash
npm install @oak-foundation/api-augment @oak-foundation/api
```

An example snippet can be seen below.
```javascript
import '@oak-foundation/api-augment'
import { options } from '@oak-foundation/api'
import { ApiPromise, WsProvider } from '@polkadot/api'

async function main() {
  const provider = new WsProvider("wss://rpc.turing-staging.oak.tech")
  const api = await ApiPromise.create(options({ provider }));

  const fee = await api.rpc.automationTime.getTimeAutomationFees("Notify", 1)
  console.log("fee", fee.toPrimitive());
}
main().catch(console.error).finally(() => process.exit()); 
```

You can find more examples in our [Javascript Example Repo](https://github.com/OAK-Foundation/javascript-examples).
