#!/bin/sh
# Yeti Installer for macOS / Linux
# Usage: curl -fsSL https://yetirocks.com/install.sh | sh
set -e

REPO="yetirocks/yeti"
INSTALL_DIR="/usr/local/bin"

echo "Installing Yeti..."

# Detect platform
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
case "$ARCH" in
  x86_64) ARCH="x86_64" ;;
  aarch64|arm64) ARCH="aarch64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

case "$OS" in
  darwin) PLATFORM="apple-darwin" ;;
  linux) PLATFORM="unknown-linux-gnu" ;;
  *) echo "Unsupported OS: $OS"; exit 1 ;;
esac

TARGET="${ARCH}-${PLATFORM}"
LATEST=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')
URL="https://github.com/${REPO}/releases/download/${LATEST}/yeti-${LATEST}-${TARGET}.tar.gz"

echo "Downloading yeti ${LATEST} for ${TARGET}..."
TMP=$(mktemp -d)
curl -fsSL "$URL" -o "$TMP/yeti.tar.gz"
tar xzf "$TMP/yeti.tar.gz" -C "$TMP"

echo "Installing to ${INSTALL_DIR}..."
sudo mv "$TMP/yeti" "$INSTALL_DIR/yeti"
sudo chmod +x "$INSTALL_DIR/yeti"
rm -rf "$TMP"

echo "Yeti ${LATEST} installed successfully!"
echo "Run 'yeti init' to get started."
