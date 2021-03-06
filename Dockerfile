FROM hayd/ubuntu-deno

EXPOSE 8080

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache hello.ts

CMD ["run", "--allow-net", "hello.ts"]

