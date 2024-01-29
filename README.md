# Projeto EAD Domain Modeling

Este repositório contém um projeto para fins de aprendizados utilizando DDD e TDD.

## Tecnologias Utilizadas

- `TypeScript`: uma linguagem de programação fortemente tipada que se baseia em JavaScript, oferecendo melhorias na escrita e manutenção do código.
- `Jest`: Framework de teste em JavaScrip
- `@faker-js/faker`: Uma biblioteca que ajuda a gerar dados falsos para testes. Pode ser usada para criar dados fictícios como nomes, endereços, números, textos, etc.
- `UUID`: Uma biblioteca para a geração de identificadores únicos universais (UUIDs). É útil para criar identificadores que precisam ser únicos em diferentes sistemas, garantindo que não haja colisões.
- `tsconfig-paths`: Uma biblioteca que permite mapear caminhos e aliases no `tsconfig.json` para módulos em tempo de execução, facilitando a importação de módulos internos sem a necessidade de caminhos relativos complexos. Isso torna o código mais limpo e fácil de manter, especialmente em projetos TypeScript de grande escala.

## Estrutura de Diretório

A estrutura de diretório principal é a seguinte:

- `src`: Este é o diretório onde todo o código fonte do projeto reside.
  - `constants`: Este diretório é utilizado para armazenar todas as constantes do projeto. Constantes são valores que não mudam ao longo do tempo e são usados em várias partes do código. Isso inclui, por exemplo, códigos de erro.
  - `entity`: Este diretório contém as entidades do domínio, que são as classes que representam os conceitos centrais do negócio e suas regras.
  - `error`: Este diretório contém a classe que representa os erros específicos que podem ocorrer durante a execução do projeto. Esses erros são geralmente instanciados e lançados quando ocorre uma condição de erro específica. Cada instância da classe de erro pode conter informações adicionais sobre o erro, como um código de erro ou uma mensagem.
  - `shared`: Este diretório contém código que pode ser compartilhado entre diferentes partes do projeto.
    - `values-objects`: Este diretório contém objetos de valor, que são objetos simples que contêm valores, mas não têm identidade.
  - `utils`: Este diretório é utilizado para armazenar funções utilitárias que são usadas em várias partes do projeto. Estas funções podem incluir operações comuns que são realizadas em muitos lugares no código, como validações, formatações de dados, entre outros.
- `test`: Este diretório é o espelho do diretório `src` e é utilizado para armazenar todos os testes do projeto. Os testes são escritos usando a biblioteca Jest e são usados para verificar se o código do projeto está funcionando como esperado. Cada arquivo de teste geralmente corresponde a um arquivo de código fonte e contém vários testes que verificam diferentes aspectos do código fonte correspondente.


## Instalação e Testes

Para instalar o projeto, siga estas etapas:

1. Clone o repositório.
```shell
git clone git@github.com:dyhalmeida/ead-domain-modeling.git
```
2. Navegue até o diretório do repositório clonado e execute o comando `npm install` para instalar todas as dependências.
```shell
npm install
```
3. Para executar os testes, execute `npm test` no diretório do repositório.
```shell
npm test
```
