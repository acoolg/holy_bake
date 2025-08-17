# HOLY MAKE
**write less, bug more**  
***write 58% less code***
  
## Compile a text to mcfunction
**Input:**
```fuck
20 say cool thing
100 command title @a title betgwegtbh
50 node walk 0 100 20 2
# balabo balaba aaa
60 node walk 19 89 64 2
````

**Output:**

```mcfunction
execute as @a[scores={cutscene.tick=20},c=1] run say say cool thing
execute as @a[scores={cutscene.tick=100},c=1] at @s run command title @a title betgwegtbh
execute as @a[scores={cutscene.tick=50},c=1] run summon runners:walk_target 0 100 20
execute as @a[scores={cutscene.tick=50},c=1] positioned 0 100 20 run scoreboard players set @e[c=1] npcmove.index 2
# balabo balaba aaa
execute as @a[scores={cutscene.tick=60},c=1] run summon runners:walk_target 19 89 64
execute as @a[scores={cutscene.tick=60},c=1] positioned 19 89 64 run scoreboard players set @e[c=1] npcmove.index 2
```

## Able to plugin

Do it yourself. I'm not helping you.


## Any bug
Every bug is because of the holy reason by God.  
Not my fault.  
It works on my computer.


## How to use

1. Put your `.txt` file in a folder called `holy_text` (if it doesn't exist, create it yourself).
2. Run:

```powershell
npm run make
```

3. The result will be in a folder called `holy_function`.
