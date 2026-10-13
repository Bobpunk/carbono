#!/usr/bin/env bash
set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "  ╔═══════════════════════════════════════════╗"
echo "  ║           🪵 CARBONO - Setup              ║"
echo "  ║     Clonador de sites com IA              ║"
echo "  ╚═══════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar se Docker/Podman está instalado
check_container_runtime() {
    if command -v podman &> /dev/null; then
        echo -e "${GREEN}✓ Podman encontrado${NC}"
        CONTAINER_CMD="podman"
        COMPOSE_CMD="podman-compose"
        if ! command -v podman-compose &> /dev/null; then
            echo -e "${YELLOW}⚠ podman-compose não encontrado. Instalando...${NC}"
            pip install podman-compose 2>/dev/null || pip3 install podman-compose 2>/dev/null || {
                echo -e "${RED}✗ Não foi possível instalar podman-compose. Instale manualmente.${NC}"
                echo "  https://github.com/containers/podman-compose"
                exit 1
            }
        fi
    elif command -v docker &> /dev/null; then
        echo -e "${GREEN}✓ Docker encontrado${NC}"
        CONTAINER_CMD="docker"
        COMPOSE_CMD="docker compose"
    else
        echo -e "${RED}✗ Docker ou Podman não encontrado.${NC}"
        echo "  Instale: https://podman.io ou https://docker.com"
        exit 1
    fi
}

# Criar .env.local se não existir
setup_env() {
    if [ -f .env.local ]; then
        echo -e "${YELLOW}⚠ .env.local já existe. Pulando configuração.${NC}"
        return
    fi

    echo ""
    echo -e "${BLUE}Configure suas chaves de API:${NC}"
    echo ""

    # Firecrawl (obrigatório)
    echo -e "${YELLOW}1. FIRECRAWL_API_KEY (obrigatório)${NC}"
    echo "   Obtenha em: https://firecrawl.dev"
    read -p "   Chave: " FIRECRAWL_KEY

    # Provider de IA (escolher um)
    echo ""
    echo -e "${YELLOW}2. Provider de IA (escolha um):${NC}"
    echo "   1) Groq (recomendado - rápido e grátis)"
    echo "   2) Google Gemini"
    echo "   3) OpenAI"
    echo "   4) Anthropic"
    read -p "   Opção [1-4]: " AI_OPTION

    AI_KEY=""
    AI_ENV=""
    case $AI_OPTION in
        1)
            AI_ENV="GROQ_API_KEY"
            echo "   Obtenha em: https://console.groq.com"
            ;;
        2)
            AI_ENV="GEMINI_API_KEY"
            echo "   Obtenha em: https://aistudio.google.com/app/apikey"
            ;;
        3)
            AI_ENV="OPENAI_API_KEY"
            echo "   Obtenha em: https://platform.openai.com"
            ;;
        4)
            AI_ENV="ANTHROPIC_API_KEY"
            echo "   Obtenha em: https://console.anthropic.com"
            ;;
        *)
            echo -e "${RED}Opção inválida. Usando Groq como padrão.${NC}"
            AI_ENV="GROQ_API_KEY"
            ;;
    esac
    read -p "   Chave: " AI_KEY

    # Sandbox (escolher um)
    echo ""
    echo -e "${YELLOW}3. Sandbox Provider (escolha um):${NC}"
    echo "   1) E2B (recomendado)"
    echo "   2) Vercel Sandbox"
    read -p "   Opção [1-2]: " SANDBOX_OPTION

    case $SANDBOX_OPTION in
        1)
            SANDBOX_PROVIDER="e2b"
            echo "   Obtenha em: https://e2b.dev"
            read -p "   E2B_API_KEY: " E2B_KEY
            ;;
        2)
            SANDBOX_PROVIDER="vercel"
            echo "   Configure: https://vercel.com/dashboard"
            read -p "   VERCEL_OIDC_TOKEN (ou 'auto'): " VERCEL_TOKEN
            ;;
        *)
            echo -e "${RED}Opção inválida. Usando E2B como padrão.${NC}"
            SANDBOX_PROVIDER="e2b"
            read -p "   E2B_API_KEY: " E2B_KEY
            ;;
    esac

    # Criar arquivo .env.local
    cat > .env.local << EOF
FIRECRAWL_API_KEY=${FIRECRAWL_KEY}

${AI_ENV}=${AI_KEY}

SANDBOX_PROVIDER=${SANDBOX_PROVIDER}
EOF

    if [ "$SANDBOX_PROVIDER" = "e2b" ]; then
        echo "E2B_API_KEY=${E2B_KEY}" >> .env.local
    else
        echo "VERCEL_OIDC_TOKEN=${VERCEL_TOKEN}" >> .env.local
    fi

    echo ""
    echo -e "${GREEN}✓ .env.local criado com sucesso!${NC}"
}

# Build e execução
run_container() {
    echo ""
    echo -e "${BLUE}Iniciando o Carbono...${NC}"

    $COMPOSE_CMD up --build -d

    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✓ Carbono rodando com sucesso!${NC}"
    echo -e "${GREEN}  → http://localhost:3000${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════${NC}"
    echo ""
    echo "  Comandos úteis:"
    echo "    Logs:     $COMPOSE_CMD logs -f"
    echo "    Parar:    $COMPOSE_CMD down"
    echo "    Reiniciar: $COMPOSE_CMD restart"
    echo ""
}

# Executar
check_container_runtime
setup_env
run_container
