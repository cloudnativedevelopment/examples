# Payroll

This guides shows an example of developing a Spring Boot Java application with cnd. It's based on [Spring's gs-rest-service example](https://github.com/spring-guides/gs-rest-service).

## Deploy the payroll service

Clone the repo and move to this example folder.

```console
git clone https://github.com/okteto/examples
cd examples/java-kubectl
```

Deploy the Payroll application by using the following command:
```console
kubectl apply -f manifests
```

Wait for one or two minutes until the application is running. Run the following command to get the External IP of the service:
```console
kubectl get service payroll
```

## Cloud native development

In order to activate your Cloud Native Development, execute:

```console
cd payroll
cnd up
```

This will create a remote container which is synchronized with your local code changes. The container already includes java dev tools (e.g. gradle), and it's configured to  automatically compile your code directly on the cluster everytime you make a change.

On a second terminal screen execute the command below. This will run the `boot` command as defined on [`cnd.yml`](cnd.yml). The boot command will run `gradle bootRun` directly in the cluster. The command will start your service and reload it automatically after every succesful compilation.
```console
cnd run boot
```

Verify that everything is up and running by calling the `/employees` endpoint from your local machine:
```console
curl http://<external-ip>:8080/employees
```

The response to a successful request is a list of employees:
```json
[
    {"id":1,"name":"Pablo Chico de Guzman"},{"id":2,"name":"Ramon Lamana"},
    {"id":3,"name":"Ramiro Berrelleza"},{"id":4,"name":"Cindy Lopez"}
]
```

You can also get a single employee by passing an employee ID:
```console
curl http://<external-ip>:8080/employees/4
```
```json
{
    "id":4,
    "name":"Cindy Lopez"
}
```

 Time to write some code. Let's say that the company just hired employee #5, and you're tasked with adding her to the employee list. First, we'll check and see if someone else already took care of the work by calling the API:

 ```console
curl http://<external-ip>:8080/employees/4
```
```json
{
    "timestamp":"2019-01-12T04:36:29.225+0000",
    "status":404,
    "error":"Not Found",
    "message":"employee not found",
    "path":"/employees/5"
}
```
 
 Alright, the new employee is not yet in the system. Open [payroll/src/main/java/payroll/PayrollController.java](payroll/src/main/java/payroll/PayrollController.java) with your favorite IDE. Add the new employee to the list (look around line 20) and save your changes.
 ```java
 ...
    this.employees.put(4, new Employee(4, "Cindy Lopez"));
    this.employees.put(5, new Employee(5, "Alexandra Greyson"));
...
 ```

 Go back to your terminal and call API again:
```console
curl http://<external-ip>:8080/employees/5
```
```json
{
    "id":5,
    "name":"Alexandra Greyson"
}
```

Your changes were automatically applied, no docker or kubectl required 💪! 

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