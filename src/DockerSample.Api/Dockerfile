FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
#EXPOSE 50119
#EXPOSE 44393

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["DockerSample.Api.csproj", "DockerSample.Api/"]
RUN dotnet restore "DockerSample.Api/DockerSample.Api.csproj"
COPY . "DockerSample.Api/"
WORKDIR "/src/DockerSample.Api"
RUN dotnet build "DockerSample.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "DockerSample.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "DockerSample.Api.dll"]
