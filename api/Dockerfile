FROM rust:1.69-buster as base
WORKDIR /usr/src/api
COPY . /usr/src/api

EXPOSE 3001
RUN cargo build --release
ENTRYPOINT ["./target/release/api"]
