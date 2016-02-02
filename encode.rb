describe "#substitute" do
  it "works" do
    expect(substitute("right 23", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")).to eq("XYZABCDEFGHIJKLMNOPQRSTUVW")
    expect(substitute("left 3", "ABCDEFGHIJKLMNOPQRSTUVWXYZ")).to eq("XYZABCDEFGHIJKLMNOPQRSTUVW")
    expect(substitute("right 3", "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD")).to eq("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG")
  end
end

LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

def substitute(key, text)
  direction, key = key.split
  key = key.to_i
  key *= -1 if direction == 'left'
  encoded = ""
  text.split("").each do |char|
    if index = LETTERS.index(char)
      index += key
      index -= 26 if index > 25
      index += 26 if index < 0
      encoded += LETTERS[index]
    else
      encoded += char
    end
  end
  encoded
end
