## Description

[Express] framework Javascript starter repository.

## Installation

### install node dependencies

```bash
$ yarn install
```

## Running the app ( local )

````bash
# development
$ yarn start:dev

## Run docker
# 1) Build mage:
$ docker build -t nature-app-2023 .
# 2) chạy container ( mỗi lần thay đổi code thì stop nó lại rồi chạy lại )
$ docker compose up -d --build

## migrate ( just only 4 step )
```bash
$ yarn generate-schema ( đối với window thì lệnh này được thực thi ở ubuntu)
$ npx prisma generate
$ npx prisma migrate dev ( phải chạy docker lên )
$ *set name of file migrate
````
