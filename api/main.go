package main

import (
	"github.com/YutoSekiguchi/alque/router"
	"github.com/YutoSekiguchi/alque/util"
)

func main() {
	db := util.InitDb()
	router.InitRouter(db)
}
