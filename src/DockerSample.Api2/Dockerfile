FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
#EXPOSE 51836
#EXPOSE 44355

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["DockerSample.Api2.csproj", "DockerSample.Api2/"]
RUN dotnet restore "DockerSample.Api2/DockerSample.Api2.csproj"
COPY . "DockerSample.Api2/"
WORKDIR "/src/DockerSample.Api2"
RUN dotnet build "DockerSample.Api2.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "DockerSample.Api2.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
#RUN dotnet ef database update
ENTRYPOINT ["dotnet", "DockerSample.Api2.dll"]
