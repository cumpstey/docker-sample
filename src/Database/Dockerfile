FROM mcr.microsoft.com/mssql/server:2017-latest

# Create directory within SQL container for database files
RUN mkdir -p /opt/mssql-scripts

# Copy required files from host to container
COPY ./sql/*.sql /opt/mssql-scripts/

# Set environment variables
ENV MSSQL_SA_PASSWORD=Password[1]
ENV ACCEPT_EULA=Y
ENV MSSQL_PID=Developer

# Run initialisation scripts
RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Password[1]' -i /opt/mssql-scripts/000_CreateDatabase.sql \
    && for f in /opt/mssql-scripts/*.sql; do /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Password[1]' -d DockerSample -i "$f"; done \
    && pkill sqlservr 
