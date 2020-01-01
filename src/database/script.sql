create database loja_saudavel;
use loja_saudavel;

create table usuario(
codigo_usuario int not null primary key auto_increment,
nome_usuario varchar(200) not null,
email_usuario varchar(200) not null,
senha_usuario varchar(200) not null
);

create table carrinho(
codigo_carrinho int not null primary key auto_increment,
codigo_usuario_fk int not null,
foreign key (codigo_usuario_fk) references usuario(codigo_usuario)
);

create table produto(
codigo_produto int not null primary key auto_increment,
nome_produto varchar(200) not null,
valor_unitario_produto double not null
);

create table item_carrinho(
codigo_item_carrinho int not null primary key auto_increment,
codigo_carrinho_fk int not null,
codigo_produto_fk int not null,
foreign key (codigo_produto_fk) references produto(codigo_produto),
foreign key (codigo_carrinho_fk) references carrinho(codigo_carrinho)
);

DELIMITER $$
CREATE PROCEDURE criar_novo_usuario(nome varchar(200), email varchar(200), senha varchar(200))
BEGIN
	declare email_create varchar(200);
    set email_create = (select email_usuario from usuario where email_usuario = email);
    if (email_create is null) then
		insert into usuario values(null, nome, email, senha);
		select 'true' as 'create';
	else
		select 'false' as 'create';
    end if;

END;
$$ DELIMITER ;

DELIMITER $$
CREATE PROCEDURE autenticar_usuario(email_log varchar(200), senha_log varchar(200))
BEGIN
	declare senha varchar(200);
    set senha = (select senha_usuario from usuario where email_usuario = email_log);
    if(senha is not null ) then
		if (senha = senha_log) then
			select 'true' as 'log', (select nome_usuario from usuario where email_usuario = email_log) as 'name';
		else
			select 'false' as 'log';
        end if;
    else
		select 'false' as 'log';
    end if;
END;
$$ DELIMITER ;

DELIMITER $$
CREATE PROCEDURE listar_produtos()
begin
	select nome_produto as 'product_name', valor_unitario_produto as 'product_value' from produto;
end;
$$ DELIMITER ;

DELIMITER $$
CREATE PROCEDURE adicionar_novo_produto(nome varchar(200), valor double)
begin
	insert into produto values(null, nome, valor);
end;
$$ DELIMITER ;

call adicionar_novo_produto('Banana', 2.5);
call adicionar_novo_produto('goiaba', 5.50);
call listar_produtos();
call criar_novo_usuario('samuel', 'samuelguedes7070@gmail.com', 'Guedes');
#call autenticar_usuario('samuelguedes7070@gmail.com', 'guedes');
