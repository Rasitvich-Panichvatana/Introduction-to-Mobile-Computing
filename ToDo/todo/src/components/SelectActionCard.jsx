import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function SelectActionCard({ activities, selectedCard, setSelectedCard }) {
  const formatDate = (iso) => {
  const [date, time] = iso.split("T");

  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  return `${day}/${month}/${year} ${hour}:${minute}`;
};

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 3,
      }}
    >
      {activities.map((card) => (
        <Card key={card.id}>
          <CardActionArea
            onClick={(e) => { e.stopPropagation(); setSelectedCard(card)}}
            data-active={selectedCard?.id === card.id ? '' : undefined}
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
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">
                {card.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {formatDate(card.when)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}


export default SelectActionCard;
