import { CalendarRecordDataType } from '@/@types/common';
import { ResponsiveTimeRange } from '@nivo/calendar'
import { useEffect } from 'react';

const CalendarRecord = (props: CalendarRecordDataType) => {
  const { from, to, data } = props;

  return (
    <div style={{ height: 270}} className='text-gray-500'>
    <ResponsiveTimeRange
        data={data}
        from={from}
        to={to}
        emptyColor="#aaa"
        colors={[ '#6ee77b', '#28a745', '#0a4d2e' ]}
        minValue="auto"
        weekdayTicks={[0, 2, 4, 6]}
        margin={{ top: 40, right: 0, bottom: 10, left: 0 }}
        monthLegendOffset={8}
        weekdayLegendOffset={50}
        dayRadius={5}
        dayBorderWidth={0}
        daySpacing={3}
        dayBorderColor="#eee"
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'row',
        //         justify: false,
        //         itemCount: 4,
        //         itemWidth: 42,
        //         itemHeight: 36,
        //         itemsSpacing: 14,
        //         itemDirection: 'right-to-left',
        //         translateX: -60,
        //         translateY: -60,
        //         symbolSize: 20
        //     }
        // ]}
    />
    </div>
  );
}

export default CalendarRecord;