import { Card, Text , Title, List, ListItem } from "@tremor/react";

export default function Lists() {
  return (
    <div className="mx-4">
      <div className="flex justify-between ">
        <h1>Actividad</h1>
        <h2>ver todo</h2>
      </div>
      <Card>
        <Title>Hoy</Title>
        <List>
            <ListItem className="flex items-center">
              <Card className="bg-black w-5" ></Card>
              <span className="absolute left-20">Envio a lucas</span>
              <span>-$2800</span>
            </ListItem>
        </List>
      </Card>
    </div>
  );
}
