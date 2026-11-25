import { useNavigate } from 'react-router';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { generateLiturgicalCalendar } from '../utils/liturgia-calculator';
import { FeaturePageHeader } from '../../../shared/components/FeaturePageShell';

export function CalendarioLiturgicoPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const diasLiturgicos = useMemo(() => {
    return generateLiturgicalCalendar(currentDate.getFullYear());
  }, [currentDate.getFullYear()]);

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const currentMonthData = diasLiturgicos.filter((d) => d.mes === currentDate.getMonth() + 1);

  return (
    <div className="min-h-screen bg-church-bg text-church-text font-sans pb-24">
      <FeaturePageHeader
        icon={CalendarIcon}
        title="Calendário Litúrgico"
        subtitle="Solenidades, festas e memórias do ano litúrgico."
        backLabel="Voltar à Liturgia"
        onBack={() => navigate('/liturgia')}
        maxWidthClassName="max-w-4xl"
      />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex items-center justify-between gap-3 rounded-[1.5rem] bg-church-bg-secondary p-4 shadow-md shadow-church-bg-darker/10">
          <button
            onClick={handlePrevMonth}
            className="rounded-full p-2 text-church-accent transition-colors hover:bg-church-bg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg sm:text-2xl font-serif text-church-accent-hover text-center">
            {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={handleNextMonth}
            className="rounded-full p-2 text-church-accent transition-colors hover:bg-church-bg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {currentMonthData.length === 0 ? (
          <div className="rounded-[1.5rem] bg-church-bg-secondary py-16 text-center shadow-md shadow-church-bg-darker/10">
            <CalendarIcon className="w-12 h-12 text-church-text/20 mx-auto mb-4" />
            <p className="text-church-text/60 italic font-serif">
              Nenhuma solenidade ou festa principal registrada para este mês.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentMonthData.map((dia, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 rounded-[1.5rem] bg-church-bg-secondary p-5 shadow-md shadow-church-bg-darker/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-church-bg-darker/15 md:flex-row md:items-center md:gap-6 md:p-6"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-church-bg border border-church-border-hover rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-serif text-church-accent">{dia.dia}</span>
                  <span className="text-xs uppercase text-church-text/60">
                    {meses[dia.mes - 1].substring(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-church-accent mb-1">{dia.titulo}</h3>
                  <p className="text-church-text/80">{dia.tipo}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-church-border-hover bg-church-bg">
                    Cor: <span className="text-church-accent">{dia.cor}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
