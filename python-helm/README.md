# vote
Example helm + python app

A simple helm chart that deploys a Python app (using Flask) to demo the power of [cloud native development](https://github.com/cnd).

*Prerequisites: you need to have a kubernetes cluster running with helm installed.*

## Deploy the chat

Clone the repo and move to this example folder.

```console
git clone https://github.com/okteto/examples
cd examples/python-helm
```

Deploy the Voting chart using the following command:
```console
helm install --name vote ./chart/vote
```

Wait for one or two minutes until the application is running. 

Follow the instructions displayed on your terminal to access your application.

## Develop as a Cloud Native Developer

In order to activate your Cloud Native Development, execute:

```console
cd vote
cnd up
```

This will create a remote container which is synchronized with your local code changes and hot reloads these changes without rebuilding containers (eliminating the **docker build/push/pull/redeploy** cycle).

Edit the file `vote/app.py` and change the `option_a` in line 8 from "Cats" to "Otters". Save your changes.

Finally, refresh the Voting App UI, and cool! your code changes are live!

*review [cnd's usage](https://github.com/okteto/cnd/docs/cli-reference.md) guide to see other commands available to help you speed you up your development.*

## Cleanup

Cancel the `cnd up` command by pressing `ctrl + c` and run the following command to deactivate the cloud native environment:

```console
cnd down
``` 

Run the following command to remove the resources created by this guide: 

```console
helm delete --purge vote
```




