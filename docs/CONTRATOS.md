# Contratos entre João e Thiago

Este arquivo combina o que cada lado precisa chamar. Não edite os arquivos do
outro sem combinar.

## 1. Estado do jogo (#27)

`src/state/gameState.ts` é TypeScript puro (não importa Excalibur) e é a única
fonte de pontos, vidas e sala. **Nenhuma cena ou ator deve guardar esses
valores.**

API disponível:

```ts
getScore(): number
getLives(): number
getRoom(): number
addPoints(points: number): void
registerEnemyKill(): void        // soma GAME_RULES.pointsPerEnemy (100)
loseLife(): void                 // nunca deixa as vidas abaixo de zero
isGameOver(): boolean            // true quando as vidas chegam a 0
setRoom(value: number): void
resetGameState(): void           // zera pontos, vidas e sala
```

Quem chama: `Bullet` (ao matar um `Enemy`) e o `main.ts` (ao trocar de sala,
ao morrer e ao reiniciar). O HUD só lê.

## 2. Morte do jogador (#29)

O ponto único de entrada é `handlePlayerDeath(player?)`, dentro de
`src/main.ts`. O Thiago **não precisa chamar essa função diretamente**: ela é
ligada aos ganchos que já existem nos arquivos dele.

### O que já está pronto nos arquivos do Thiago

`src/actors/Enemy.ts`:
```ts
} else if (other instanceof Player) {
    Enemy.onHitPlayer(this, other);
    this.die();
}
```

`src/actors/EnemyBullet.ts`:
```ts
if (other instanceof Player) {
    EnemyBullet.onHitPlayer(other);
}
```

Continuem chamando esses ganchos exatamente assim. Não chamem `loseLife`
diretamente nem recarreguem a sala por conta própria.

### O que o main.ts liga (já implementado)

```ts
Enemy.onHitPlayer = (_enemy, player) => handlePlayerDeath(player);
EnemyBullet.onHitPlayer = (player) => handlePlayerDeath(player);
```

### Comportamento garantido

- Perde **uma** vida por morte (chamadas repetidas no mesmo instante são
  ignoradas).
- Com vidas restantes: a sala atual é recarregada depois de
  `GAME_RULES.respawnDelayMs` (1200 ms).
- Com zero vidas: aparece `GAME OVER` com a pontuação final; ENTER zera o
  estado (`resetGameState`) e volta para a sala 0.
- O jogador é removido da cena imediatamente ao morrer.

## 3. HUD (#28)

`src/ui/Hud.ts` cria `ex.Label`s com `coordPlane: ex.CoordPlane.Screen` e lê o
estado pelo `gameState`. Se o Thiago criar uma cena nova, basta chamar
`createHud(scene)` e `updateHud(hud)`; o HUD não altera o estado.

## 4. Pedidos ao Thiago

Nenhum obrigatório no momento. Se as colisões mudarem de assinatura, mantenham
os ganchos `Enemy.onHitPlayer` e `EnemyBullet.onHitPlayer` para a #29
continuar funcionando.
