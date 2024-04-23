import * as config from './config.js';

//Formata a data do parametro para uma representação de data em pt-BR (DD/MM/YYYY HH:mm)
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function delay() {
  // Gera um número aleatório entre O VALOR MÍNIMO E O MÁXIMO
  const randomTime = Math.floor(Math.random() * (config.MAX_RANGE_DELAY - config.MIN_RANGE_DELAY + 1)) + 1000;
  return new Promise(resolve => setTimeout(resolve, randomTime));
}

//Caso ambas as datas estejam vazias, retorna FALSE. Casos em que há VENDA DIRETA, sem datas.
//Caso tenha apenas uma data, verifica a validade da data fornecida. Se estiver expirada, retorna true.
//Caso tenha duas datas, verifica ambas as datas. Retorna true apenas se ambas estiverem expiradas, caso contrário retorna false.
export function checkDatesExpired(dateString1, dateString2) {

  // Obtém o timestamp atual
  const currentDate = new Date();
  const date1 = parseDateTime(dateString1);
  const date2 = parseDateTime(dateString2);

  // Se ambos os valores são strings vazias, retorna false
  if (!date1 && !date2) {
    return false;
  }

  // Compara as datas com a data atual
  let expiredDate1 = date1 ? date1 < currentDate : false;
  let expiredDate2 = date2 ? date2 < currentDate : false;

  // Se apenas uma data for fornecida, retorna true se essa data estiver expirada
  if ((date1 && !date2) || (!date1 && date2)) {
    return expiredDate1 || expiredDate2;
  }

  // Se ambas as datas forem fornecidas, retorna true apenas se ambas estiverem expiradas
  return expiredDate1 && expiredDate2;
}

// Converte a string de data/hora no formato "DD/MM/YYYY HH:mm" para um objeto Date
function parseDateTime(dateTimeString) {
  if (!dateTimeString) return null;
  const [date, time] = dateTimeString.split(' ');
  if (!date || !time) return null;

  const [day, month, year] = date.split('/').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
}