# cortapau
Trabalho de Hands on Work 9 realizado no curso de Análise e Desenvolvimento de Sistemas da UNIVALI



Para executar o projeto o computador precisará ter o Docker compose instalado.


Start containers:
```sh
docker-compose up -d
```
or, if you intend to use [huey](https://github.com/coleifer/huey) (batch processing)

```sh
docker-compose -f docker-compose-consumer.yml up -d
```
