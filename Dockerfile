FROM denoland/deno:2.0.2

# Create app directory
WORKDIR /app

# The deno user already exists in the base image
# Just ensure proper ownership
RUN chown -R deno:deno /app

USER deno

# Copy dependency file
COPY --chown=deno:deno deps.ts .
RUN deno cache deps.ts

# Copy application code
COPY --chown=deno:deno . .

# Cache the main application
RUN deno cache main.ts

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]