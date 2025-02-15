# Build stage
FROM golang:1.23 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

# RUN go test ./... -v || { echo 'Unit tests failed'; exit 1; }

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main || { echo 'Build failed'; exit 1; }

# Run stage
FROM debian:bullseye-slim

WORKDIR /root/

COPY --from=builder /app/main .

COPY .env .env

EXPOSE 8080

CMD ["./main"]