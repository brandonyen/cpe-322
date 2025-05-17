# Lab 1: GHDL and GTKWave

For this lab, I decided to explore a half adder and t-flip-flop using SystemVerilog and EDAPlayground.

## Half Adder

design.sv

```
module adder(
  input logic i0, i1, ci, // input bit 0, input bit 1, carry in bit
  output logic s, co // sum output, carry bit out
);

  assign s = i0 ^ i1 ^ ci;
  assign co = (i0 & i1) | (i1 & ci) | (i0 & ci);
endmodule
```

testbench.sv

```
`timescale 1ns / 1ns

module adder_tb();
  logic [3:0] a, b; // 4 bit inputs
  logic carry; // to print the carry_out
  logic [3:0] s, carry_out, carry_in;
  logic [4:0] res; // to print the output

  assign res = {carry, s};

  // all input values are either 0 or 1 except for carry_in, so to make the adders run, we need to set the value of carry_in and it will run. I did not set the ci variable to carry_out to introduce delays between each adder, otherwise after inputting carry_in[0] the adders would run without delay
  adder adder0(.i0(a[0]), .i1(b[0]), .ci(carry_in[0]), .s(s[0]), .co(carry_out[0]));
  adder adder1(.i0(a[1]), .i1(b[1]), .ci(carry_in[1]), .s(s[1]), .co(carry_out[1]));
  adder adder2(.i0(a[2]), .i1(b[2]), .ci(carry_in[2]), .s(s[2]), .co(carry_out[2]));
  adder adder3(.i0(a[3]), .i1(b[3]), .ci(carry_in[3]), .s(s[3]), .co(carry_out[3]));

  initial begin
    $dumpfile("dump.vcd");
    $dumpvars();

    a <= 4'b1010;
    b <= 4'b0011;
    #1;

    // first bit
    carry_in[0] <= 1'b0;
    #1;

    // second bit
    carry_in[1] <= carry_out[0];
    #1;

	// third bit
    carry_in[2] <= carry_out[1];
    #1;

    // fourth bit
    carry_in[3] <= carry_out[2];
    #1;

    carry <= carry_out[3]; // the final carry out value
    #1;

    // Print output data
    $display("input 1: ", a, ", bits: ", a[3], a[2], a[1], a[0]);
    $display("input 2: ", b, ", bits: ", b[3], b[2], b[1], b[0]);
    $display("result: ", res, ", bits: ", s[3], s[2], s[1], s[0], ", carry out: ", carry);
  end
endmodule
```

This results in the following output:
<img width="1389" alt="Screenshot 2025-03-18 at 9 53 05 PM" src="https://github.com/user-attachments/assets/465659cf-4c6d-4af7-b3f3-8a18bf9bfe46" />

And the following statement is printed:
<img width="342" alt="Screenshot 2025-03-18 at 9 53 59 PM" src="https://github.com/user-attachments/assets/9c18296a-d30a-49a4-b34b-3a1c2ac22319" />

## T-Flip-Flop

design.sv

```
module half_adder(
  input logic a, b,
  output logic c, s
);

  assign s = a ^ b;
  assign c = a & b;
endmodule

module t_ff(
  input logic T, clk, set, rst,
  output logic out
);

  always_ff @(posedge clk or posedge set or posedge rst) begin
    if (set)
      out <= 1;
    else if (rst)
      out <= 0;
    else if (T)
      out <= ~out;
  end
endmodule
```

testbench.sv

```
module t_ff_tb;
  logic clk; // global clock
  logic T, c, s; // inputs and outputs for half adder
  logic set, rst, out; // inputs and outputs for t flip flop

  t_ff dut(.T(c), .clk, .set, .rst, .out); // connect toggle to the carry of half adder
  half_adder ha0(.a(T), .b(clk), .c, .s);

  always #5 clk = ~clk; // 1 cycle is 10 ns

  initial begin
    $dumpfile("dump.vcd");
    $dumpvars();

	clk = 0;
    set = 1; // set output to 1
    rst = 1; // overrided by set, does not do anything
    #1; set = 0; rst = 0;
    #9 T = 1;
    #10 T = 0;
    #10 T = 1;
    #10 T = 0;
    $finish;
  end
endmodule
```

This results in the following output:
<img width="1390" alt="Screenshot 2025-03-18 at 9 54 28 PM" src="https://github.com/user-attachments/assets/ca357208-9fac-471f-ad22-31949f658286" />
