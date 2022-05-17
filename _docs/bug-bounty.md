---
title: Bug Bounty Program
subtitle: A reward program by which developers can receive recognition and compensation for reporting bugs, especially those pertaining to security exploits and vulnerabilities.
author: chris
tags: [develop]
---

The OAK team is eager to engage developers in building the OAK Network ecosystem. In order to enhance the product’s user experience and to improve on-chain security, OAK team launched the first “Bug-Bounty” program with potential payouts of $2,500 per report.
## Submission Guideline

1. The bug bounty program is only applicable to the OAK Network.

2. Please read the following rules for your submission to be eligible:

   For UI/UX bugs: please submit the exposed bugs in OAK’s Discord group.

   For Security bugs: please submit a summary of the exposed bug to: <bugs@oak.tech>

### Information to include in your report:

**Name of Vulnerability:** keep it short and precise. The best method is to include the name of the feature where the issue was found.

**Description:** explain the issue briefly, and describe it in simple terms.

**Environment:** include your operating system, runtime version and browser(if for frontend bugs) information in the report.

**URL:** provide the URL where the issue is found, if any.

**Screenshot or Screen Recording:** take a screenshot or video of the issue.

**Steps to Reproduce:** describe in detail the steps you took before you encountered the bug and how it can be reproduced.

**Proof of Concept:** present the issue with a working proof of concept that shows how it can be exploited.

**Additional Information (optional):** you can include extra information such as severity (critical, major, minor, trivial, enhancement), or suggested solutions with your submission.
## Additional rules

1. Please note that only vulnerabilities with a working proof of concept that shows how it can be exploited will be considered eligible for bounty rewards. Whether a report is eligible or not is judged according to the criteria above.

2. You may not release information about critical vulnerabilities found in this program to the public.

3. In case we receive duplicate reports of a specific vulnerability, only the first report is eligible for a reward.

4. Once your submission is accepted, we will contact you to collect your wallet information to issue the rewards.

## Scope
Currently, the following OAK Network code repositories are in scope for bug bounty program:
- [OAK's blockchain code](https://github.com/OAK-Foundation/OAK-blockchain)
- [Parachain Staking Module](https://github.com/OAK-Foundation/moonbeam/tree/master/pallets/parachain-staking)

## Vulnerability Classifications
**High-risk Vulnerabilities:** stealing and arbitrarily issuing or distributing tokens/disrupting consensus causes the blockchain to stop generating blocks/destroying on-chain governance and software upgrade processes/memory leaks and abnormal resource consumption.

**Medium-risk Vulnerabilities:** unexpected behavior that can only occur in extreme cases/illegal Tx is successfully executed/Unexpected behavior after successful execution of legal Tx/Single machine failure that does not affect consensus.

**Low-risk Vulnerabilities:** defects of API (LCD) and CLI/Failed to execute query commands unrelated to Tx (sub)commands failed to execute.
## Bounty Reward
We have not set a maximum reward, and the specific amount of the bounty will vary according to the severity of the issue and the quality of the report. The standard rewards are:

**High-risk:** $2,500 and above

**Medium-risk:** $1,000 and above

**Low-risk:** up to $500

All bounties will be paid in equivalent value of DOT.

The OAK Team will assess each vulnerability report and issue the bounty accordingly.

For more questions, feel free to [Contact Us](../contact-us).
