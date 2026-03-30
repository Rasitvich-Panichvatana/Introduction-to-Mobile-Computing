import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  {
    id: 1,
    name: 'ส่งการบ้าน Intro mobile',
    when: '08:00 20-03-2026',
  },
  {
    id: 2,
    name: 'ส่งการบ้าน Systems Analysis and Design',
    when: '23:59 16-03-2026.',
  },
  {
    id: 3,
    name: 'ส่งแบบตอบรับฝึกงาน',
    when: '23:59 30-04-2026.',
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 3,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent   sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',}}>
              <Typography variant="h6" component="div">
                {card.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.when}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
