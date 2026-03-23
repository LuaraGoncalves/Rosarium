import { getSantoDoDia } from '../src/domains/santos/use-cases/get-santo-do-dia';

async function test() {
  console.log('Testando Scraper do Santo do Dia...');
  
  const result = await getSantoDoDia();
  
  if (result.success) {
    console.log('\nSUCESSO!');
    console.log('Nome:', result.data.nome);
    console.log('Categoria:', result.data.categoria);
    console.log('Padroeiro:', result.data.padroeiroDe);
    console.log('Intercessão:', result.data.intercessao);
    console.log('Frase:', result.data.fraseMarcante);
    console.log('Imagem:', result.data.imagemUrl);
    console.log('\nResumo:', result.data.historiaResumo?.substring(0, 150) + '...');
    
    console.log('\nTamanho história completa:', result.data.historiaCompleta?.length, 'caracteres');
  } else {
    console.error('\nFALHA NO SCRAPER:', result.error, result.details);
  }
}

test();
