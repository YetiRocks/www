import { Highlight, themes } from 'prism-react-renderer'

const theme = {
  ...themes.vsDark,
  plain: { color: '#d4d4d4', backgroundColor: '#1e1e1e' },
  styles: [
    { types: ['keyword', 'builtin'], style: { color: '#569cd6' } },
    { types: ['class-name', 'tag'], style: { color: '#4ec9b0' } },
    { types: ['attr-name', 'selector'], style: { color: '#c586c0' } },
    { types: ['string', 'char'], style: { color: '#a8785a' } },
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#6a9955' } },
    { types: ['number', 'inserted'], style: { color: '#b5cea8' } },
    { types: ['function'], style: { color: '#b8b07e' } },
    { types: ['operator', 'punctuation'], style: { color: '#d4d4d4' } },
    { types: ['property', 'atrule', 'attr-value'], style: { color: '#9cdcfe' } },
    { types: ['boolean', 'constant'], style: { color: '#569cd6' } },
    { types: ['deleted'], style: { color: '#d16969' } },
  ],
}

interface CodeProps {
  label: string
  language?: string
  children: string
}

const langMap: Record<string, string> = {
  'bash': 'bash',
  'graphql': 'graphql',
  'gql': 'graphql',
  'yaml': 'yaml',
  'yml': 'yaml',
  'json': 'json',
  'rust': 'rust',
  'rs': 'rust',
  'toml': 'yaml',
  'markdown': 'markdown',
  'md': 'markdown',
  'ts': 'typescript',
  'tsx': 'tsx',
  'js': 'javascript',
  'jsx': 'jsx',
}

function detectLanguage(label: string): string {
  const ext = label.split('.').pop()?.toLowerCase() || ''
  if (langMap[ext]) return langMap[ext]
  if (langMap[label]) return langMap[label]
  if (label.includes('schema')) return 'graphql'
  if (label.includes('config')) return 'yaml'
  return 'bash'
}

export default function Code({ label, language, children }: CodeProps) {
  const lang = language || detectLanguage(label)

  return (
    <div className="code-block">
      <span className="code-label">{label}</span>
      <Highlight theme={theme} code={children.trim()} language={lang}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
