export type Casal = {
  slug: string;
  nomes: string;          // "Ana & Diego"
  inicioISO: string;      // "2021-03-12T00:00:00-03:00"
  dataCurta: string;      // "12/03/2021"
  mensagem: string;       // texto do casal
};

export const CASAIS: Casal[] = [
  {
    slug: "ana-e-diego",
    nomes: "Ana & Diego",
    inicioISO: "2021-03-12T00:00:00-03:00",
    dataCurta: "12/03/2021",
    mensagem:
      "Tudo começou de um jeito simples, mas se transformou em algo enorme. Eu te escolheria de novo, todos os dias.",
  },
  {
    slug: "maria-e-joao",
    nomes: "Maria & João",
    inicioISO: "2020-10-05T00:00:00-03:00",
    dataCurta: "05/10/2020",
    mensagem:
      "Nosso amor é feito de detalhes, risos e planos. Obrigado por ser meu lar.",
  },
];

export function getCasalBySlug(slug: string): Casal | undefined {
  return CASAIS.find((c) => c.slug === slug);
}
