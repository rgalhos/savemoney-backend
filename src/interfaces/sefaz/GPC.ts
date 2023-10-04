/*
 * Anexo III – Segmentos do GPC (Classificação Global de produtos)
 *
 * * From: "Economiza_Alagoas_Manual_de_Orientação_do_Desenvolvedor_versao1.0.pdf"
 * * Página: 13
 */

/**
 * @description Código GPC -> Descrição
 */
export type GPC_Dict = { [gpc: number]: string };
export type GPC_codigo_t = keyof GPC_Dict;
export type GPC_categoria_t = GPC_Dict[GPC_codigo_t];

/**
 * @description Código GPC -> Descrição
 */
export const GPC_MAP: GPC_Dict = {
    74000000: 'Acampamento',
    64000000: 'Acessórios Pessoais',
    50000000: 'Alimentos / Bebidas / Tabaco',
    89000000: 'Animais Vivos',
    78000000: 'Aparelhos Elétricos',
    70000000: 'Artes/Artesanato/Bordado',
    62000000: 'Artigos de Papelaria/ Equipamentos para Escritório/ Suprimentos de Ocasião',
    68000000: 'Audiovisual / Fotografia',
    86000000: 'Brinquedos/Jogos',
    63000000: 'Calçados',
    87000000: 'Combustíveis/Gases',
    66000000: 'Comunicação',
    94000000: 'Crops',
    10000000: 'Cuidados com os animais de estimação/Ração',
    79000000: 'Encanamento/Aquecimento/Ventilação/Condicionamento de Ar',
    71000000: 'Equipamentos Esportivos',
    84000000: 'Equipamentos para Oficina/Armazenagem de Ferramentas',
    82000000: 'Ferramentas/Equipamentos-Elétricos',
    80000000: 'Ferramentas/Equipamentos-Manuais',
    53000000: 'Higiene/Cuidados Pessoais/ Beleza',
    65000000: 'Informática/Computação',
    88000000: 'Lubrificantes',
    60000000: 'Materiais de Referência/Impressos/Textuais',
    81000000: 'Materiais para Jardinagem/Gramado',
    75000000: 'Móveis e Artigos Mobiliários para Casa e Escritório',
    61000000: 'Música',
    93000000: 'Plantas de Horticultura',
    47000000: 'Produtos de Higiene/Limpeza',
    83000000: 'Produtos para Construção',
    92000000: 'Recipientes de Armazenagem/Transporte',
    58000000: 'Segmento Transversal',
    85000000: 'Segurança/Proteção – DIY',
    91000000: 'Segurança/Vigilância',
    77000000: 'Setor Automotivo',
    51000000: 'Setor da Saúde',
    73000000: 'Utensílios de Cozinha',
    72000000: 'Utensílios Domésticos',
    67000000: 'Vestuário',
};

/**
 * @description Lista de categorias
 */
export const GPC_categorias: GPC_categoria_t[] = Object.values(GPC_MAP);

/**
 * @description Lista de códigos GPC
 */
export const GPC_codigos = Object.keys(GPC_MAP);
