export class ChapterNames {
  static random(): string {
    const index = Math.floor(Math.random() * ChapterNames.names.length);
    return ChapterNames.names[index];
  }

  static readonly names = [
    'Introdução',
    'Conclusão',
    'Conceitos Básicos',
    'Fundamentos',
    'Desafios',
    'Configuração do Ambiente',
    'Teoria',
    'Prática',
  ];
}
