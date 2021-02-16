import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// esta funca ira usar
interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

/**
 * como sera o retorno, sera um array com os dias disponivel
 * array com objeto informando o dia disponivel
 * [ { day: 1, avaliable: false }, { day: 2, avaliable: false } ]
 *
 */

// vai retornar um arry dos dia e se esta disponivel
// so que o interface nao aceita, nao tem como dizer que o IResponse é um array
/* interface IResponse {
 *   day: number;
 *   avaliable: boolean;
 *}
 */

// toco para type a interface para informar que vou retornar um array
type IResponse = Array<{
    day: number;
    avaliable: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilyService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        year,
        month,
    }: IRequest): Promise<IResponse> {
        // le todos agendamentos de um mes epsesifico
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                year,
                month,
            },
        );

        // console.log(appointments)

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        // console.log(eachDayArray)

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            // sao 10 no total, das 8h as 17h
            // verifica se tenho menos de 10 agendamento, se tiver quer dizer que tenho disponivel
            return {
                day,
                avaliable: appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilyService;
