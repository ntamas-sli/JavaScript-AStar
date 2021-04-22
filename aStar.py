def mapGen(n):
    m = [[0 for i in range(n)] for j in range(n)]
    return m

def solutionAStar(start, goal, array):
    openSet = []
    cameFrom = []
    gScore = mapGen(len(array))
    fScore = mapGen(len(array))
    fScore[1][4] = 2    
    fScore.remove(2)
    openSet.append(start)
    print(openSet)
    openSet.remove[1]
    t = True
    while t == True:
        t = False
        print('assd')


    return openSet

n = [[1, 3, 0, 3, 0],
     [0, 0, 0, 3, 2],
     [0, 0, 0, 3, 0],
     [0, 0, 0, 3, 0],
     [0, 0, 0, 0, 0],]

print(solutionAStar(n[0][0], n[1][4], n))    