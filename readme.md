<h2><img src="holybake.png" width=100%></h2>

<h3 align="center">write less, bug more</h3> 


## Compile a text to mcfunction

**Input:**

```hbk
@var a = "minecraft:creaper"

execute as @a at @s run summon $a

@repeat (1 + 1) {
    execute as @a at @s run summon $a
    say summond $a
}

# comment

@var count = 0

@repeat (5) {
    $count += 1
    execute as @a at @s run summon $a
    say summond $a $count
}
```

**Output:**

```mcfunction
execute as @a at @s run summon minecraft:creaper

execute as @a at @s run summon minecraft:creaper
execute as @a at @s run summon minecraft:creaper

#comment

execute as @a at @s run summon minecraft:creaper
say summond minecraft:creaper 1
execute as @a at @s run summon minecraft:creaper
say summond minecraft:creaper 2
execute as @a at @s run summon minecraft:creaper
say summond minecraft:creaper 3
execute as @a at @s run summon minecraft:creaper
say summond minecraft:creaper 4
execute as @a at @s run summon minecraft:creaper
say summond minecraft:creaper 5
```

## Able to plugin

NO  
wish it will be

## How to use

1. Put your `.txt` file in a folder called `holy_text` (if it doesn't exist, create it yourself).
2. Run:

```powershell
npm run make
```

3. The result will be in a folder called `holy_function`.

## also

if you don't understand what the hell is `runners:walk_target` or `npcmove.index`
well that's a new mcbe addon i'm working on


> [!WARNING]  
> this software is still in very early develoment, the software basic feature wasn't finish, do not use
