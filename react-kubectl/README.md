# Movies React App with Parcel and react-hot-reload

This repository contains the example code of a React front-end for a video streaming application. It is also configured to work on a [cloud native development](https://github.com/okteto/cnd) environment and prepared to be deployed using raw kubernetes manifests.

The demo works in any kubernetes cluster. Cloud Native Development provides more value in remote kubernetes clusters, but in order to make it simple to follow this guide, we recommend to use Docker for Mac (with Kubernetes support) or [minikube](https://github.com/kubernetes/minikube).

## Deploy the Movies React App

Clone this repo and move to this example folder:

```console
git clone https://github.com/okteto/examples
cd examples/react-kubectl
```

Run the Movies App by executing:

```console
kubectl apply -f manifests
```

Wait for one or two minutes until the application is running.

If you are running in Docker for Mac, the Movies App is available on `locahost:32000`.

If you are running in minikube, the Movies App is available on port 32000 in the minikube ip (`minikube ip`).

## Develop as a Cloud Native Developer

In order to activate your Cloud Native Development, execute:

```console
cd movies
cnd up
```

This will create a remote container which is synchronized with your local code changes and hot reloads these changes without rebuilding containers (eliminating the **docker build/push/pull/redeploy** cycle).

Our React example uses [Parcel](https://parceljs.org/) to bundle the application and enable [Hot Module Replacement](https://parceljs.org/hmr.html) to automatically update modules in the browser at runtime without needing a whole page refresh.

With CND we can bring this development experience to the cluster coding exactly like you would do in local:

```console
cnd exec yarn start
```

This will launch `parcel` and its development server in the remote container.

You can now edit the file `src/App.jsx` and change the `Movies` text in line 8 to `Netflix`. Save your changes. 

Go back to the browser, and cool! Your changes are automatically live with no need to refresh your browser!

*review [cnd's usage](https://github.com/okteto/cnd/docs/cli-reference.md) guide to see other commands available to help you speed you up your development.*

## Cleanup

Cancel the `cnd up` command by pressing `ctrl + c` and run the following command to deactivate the cloud native environment:

```console
cnd down
``` 

Run the following command to remove the resources created by this guide: 

```console
kubectl delete -f manifests
```



