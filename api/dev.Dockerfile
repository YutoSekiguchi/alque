FROM golang:1.20

WORKDIR /app

COPY . .
RUN go mod tidy
RUN go install github.com/cosmtrek/air@v1.40.4

CMD ["air"]