## Descrição
Essa aplicação é projetada para a **conversão de arquivos .cr3 para .jpeg** e armazené-los no **Google Drive**. A aplicação possui três módulos principais:

### Módulo 1: Lateralização de Autenticação (Auth Sharing Module)
**`Função:`** Recebe e processa credenciais de autenticação compartilhadas de um outro servidor já autenticado com as APIs do Google.<br>
`Por que existe:` Permite que a aplicação atue em nome de diferentes usuários ou serviços sem a necessidade de reautenticação direta.
### Módulo 2: Gerenciamento de Arquivos entre S3 e Google Drive (Transfer Image Module)
**`Função:`** Realiza o download de arquivos de um bucket S3, converte-os para o formato JPEG e os envia para o Google Drive. <br>
`Por que existe:` Arquivos que foram carregados através de URLs pré-assinadas estão no S3, e agora precisam ser enviados para o Google Drive. Isso facilita o gerenciamento dos arquivos no Drive.
### Módulo 3: Geração de URLs Pré-assinadas para Upload (Presigned URL Module)
**`Função`**: Gera URLs pré-assinadas que permitem o upload de arquivos diretamente para um bucket S3 a partir de um client. <br>
`Por que existe:` Permite ao client realizar o upload de arquivos de forma segura e eficiente, sem passar pelos servidores intermediários, melhorando a performance da aplicação.

### Utilidade
A aplicação facilita o gerenciamento e a sincronização de arquivos entre S3 e Google Drive, além de garantir que todas as operações sejam realizadas de forma segura e eficiente, sem sobrecarregar os servidores.

![image](https://github.com/user-attachments/assets/ff28d0e8-a7ac-4922-b0af-fe109376cea2)
