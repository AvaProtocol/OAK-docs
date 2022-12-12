---
title: Council
subtitle: Learn how to use Council via the polkadot.js app
author: charles
tags: [governance]
---

This article introduces how to use some functions of Council.

*Pre-requisite: Before reading this article, you should be familiar with [how to submit a proposal](/docs/gov-dev/governance-via-polkadotjs/#introduction).*

## Emerency cancel referendum

`democracy.emerencyCancel` Schedule an emergency cancellation of a referendum. Cannot happen twice to the same referendum.


1. Get the referendum index that needs to be canceled

	![referenda](../../../assets/img/governance-guide-for-developer/council/referenda.png)

1. Submit a council motion to execute `democracy.emerencyCancel`

	This call requires at least 2/3 members of the council to approve. Set the value of `threshold` parameter to the number of council members*(2/3)

	![emergency-motion](../../../assets/img/governance-guide-for-developer/council/emergency-motion.png)

1. Vote


	![motions](../../../assets/img/governance-guide-for-developer/council/motions.png)

1. Close motion to execute

	When you close the motion, The referendum will be canceled immediately.
