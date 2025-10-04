function blockScope() {
    let x = 1;
    const y = 2;

    function innerFunction() {
        let x = 10; // biến cục bộ trong innerFunction
        const y = 20; // biến cục bộ trong innerFunction
        var z = 30; // biến function-scoped
        console.log('Inside innerFunction:', x, y, z); // 10, 20, 30
    }

    innerFunction();
    console.log('Outside innerFunction:', x, y, z); // 1, 2, 30

}

blockScope();
