# Prometheus/Express

## Description

This is a simple example of how to use Prometheus with Express. To run this example, you need to have Docker installed.

## How to run

1. Clone this repository
2. Clone [Dockprom](https://github.com/stefanprodan/dockprom)
3. Access the `dockprom` folder
4. In `dockprom` folder, access the `prometheus/prometheus.yml` file and add the following lines at the end `scrape_configs`

```yml
  - job_name: nodejs
    scrape_interval: 10s
    honor_labels: true
    static_configs:
    - targets: ['172.17.0.1:3333'] # 'node-app', 'localhost:3333', 'host.docker.internal:9991'
```

> Note: If you are using Windows or Mac and your app is running at the host machine, you need to use `host.docker.internal` instead of `localhost`. If you are using Linux, you should use `172.17.0.1`. If you are running the app together with dockprom, you can use `your-app-service` as target.

5. Run `docker-compose up -d` in `dockprom` folder

If you are running your app at the host machine, you need to change the `targets` in `prometheus.yml` to `host.docker.internal:9991` for Mac or Windows or `172.17.0.1:3333` for Linux.

6. Access this repository folder
7. Run `npm install`
8. Run `docker-compose up -d`
9. Access `http://localhost:3333` to see the app running
10. Access `http://localhost:9090` to see Prometheus running
11. Access `http://localhost:3000` to see Grafana running