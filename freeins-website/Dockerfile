FROM node:18-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
# 复制 Next.js 构建输出
COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static
COPY --from=builder /app/public /usr/share/nginx/html/
# 复制 Next.js 生成的 HTML 文件到根目录
COPY --from=builder /app/.next/server/app /usr/share/nginx/html/
COPY public/index.html /usr/share/nginx/html/index.html
# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80