
#!/bin/bash
kubectl port-forward service/jupy-service 8888:8888 --address='0.0.0.0'


